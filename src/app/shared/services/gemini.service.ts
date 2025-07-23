import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private readonly API_KEY = 'AIzaSyBWM3em9-5TDJOrUZRmf-bkOWJ4wuQsdbY';
  private readonly genAI = new GoogleGenerativeAI(this.API_KEY);
  private readonly model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-pro' }); 

  constructor() {}

  private construirPromptDemo(
    enlace: string,
    cantidad: number,
    fechaInicio: string,
    fechaLimite: string
  ): string {
    return `
Quiero que generes ${cantidad} oportunidades ficticias para una demo. 
Cada una debe seguir esta estructura en JSON:

[
  {
    descripcion: "...",
    esPostulable: true | false,
    motivoPostulable: "..." | null,
    motivoNoPostulable: "..." | null,
    codigo: "...",
    fuente: "${enlace}"
  }
]

Condiciones:
- Usa la fecha de inicio: ${fechaInicio}
- Fecha límite del proceso: ${fechaLimite}
- Invéntate todo lo necesario (códigos, descripciones, motivos).
- El JSON debe ser válido, sin explicaciones ni texto adicional.
- Si quieres mezclar oportunidades postulables y no postulables, hazlo.

Solo responde con el array JSON.`;
  }

  async obtenerOportunidadesDemo(
    enlaces: string[],
    cantidad: number,
    fechaInicio: string,
    fechaLimite: string
  ): Promise<any[]> {
    const resultados: any[] = [];

    for (const enlace of enlaces) {
      const prompt = this.construirPromptDemo(enlace, cantidad, fechaInicio, fechaLimite);

      try {
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        let jsonOnly = response.text();

        // Limpiar si viene con marcas de código tipo Markdown
        jsonOnly = jsonOnly.replace(/```json|```/g, '').trim();

        let dataParsed = [];
        try {
          dataParsed = JSON.parse(jsonOnly);
        } catch (jsonError) {
          dataParsed = [{
            descripcion: '❌ No se pudo parsear JSON (demo).',
            esPostulable: false,
            motivoPostulable: null,
            motivoNoPostulable: 'Respuesta inválida',
            codigo: null,
            fuente: enlace
          }];
        }

        resultados.push(...dataParsed);

      } catch (error: any) {
        resultados.push({
          descripcion: '❌ Error con el modelo Gemini.',
          esPostulable: false,
          motivoPostulable: null,
          motivoNoPostulable: error.message || 'Error desconocido',
          codigo: null,
          fuente: enlace
        });
      }
    }

    return resultados;
  }
}
