import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { GeminiService } from '../../../shared/services/gemini.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor(private readonly geminiService: GeminiService){}

  @ViewChild('dialogInvestigacion') dialogInvestigacion!: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogAgremiaciones') dialogAgremiaciones!: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogInternacional') dialogInternacional!: ElementRef<HTMLDialogElement>;

  @ViewChild('canvasInvestigacion') canvasInvestigacion!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasAgremiaciones') canvasAgremiaciones!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasInternacional') canvasInternacional!: ElementRef<HTMLCanvasElement>;

  nuevoEnlace: string = '';
  enlaces: string[] = [];

  fechaInicio: string = '';
  fechaLimite: string = '';
  cantidad: number = 5;

  resultados: any[] = [];
  cargando: boolean = false;

  abrirDialog(tipo: string): void {
    switch (tipo) {
      case 'investigacion':
        this.dialogInvestigacion.nativeElement.showModal();
        break;
      case 'agremiaciones':
        this.dialogAgremiaciones.nativeElement.showModal();
        break;
      case 'internacional':
        this.dialogInternacional.nativeElement.showModal();
        break;
    }
  }


  agregarEnlace() {
    if (this.nuevoEnlace.trim()) {
      this.enlaces.push(this.nuevoEnlace.trim());
      this.nuevoEnlace = '';
    }
  }

  eliminarEnlace(index: number) {
    this.enlaces.splice(index, 1);
  }

  cerrarDialog(dialog: HTMLDialogElement): void {
    dialog.close();
  }

  ngAfterViewInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    new Chart(this.canvasInvestigacion.nativeElement, {
      type: 'line',
      data: {
        labels: ['2022', '2023', '2024', '2025', '2026'],
        datasets: [{
          label: 'Investigación',
          data: [100, 115, 130, 145, 160],
          borderColor: 'cyan',
          backgroundColor: 'rgba(0, 255, 255, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: { responsive: true }
    });

    new Chart(this.canvasAgremiaciones.nativeElement, {
      type: 'bar',
      data: {
        labels: ['2022', '2023', '2024', '2025'],
        datasets: [{
          label: 'Agremiaciones',
          data: [80, 85, 95, 105],
          backgroundColor: 'purple'
        }]
      },
      options: { responsive: true }
    });

    new Chart(this.canvasInternacional.nativeElement, {
      type: 'line',
      data: {
        labels: ['2022', '2023', '2024', '2025', '2026'],
        datasets: [{
          label: 'Internacional',
          data: [50, 60, 70, 85, 100],
          borderColor: 'lime',
          backgroundColor: 'rgba(0,255,128,0.3)',
          fill: true,
          tension: 0.4
        }]
      },
      options: { responsive: true }
    });
  }

  async buscarOportunidades() {
  if (!this.fechaInicio || !this.fechaLimite ||  !this.enlaces.length) {
    alert("Completa todos los campos y al menos un enlace.");
    return;
  }

  this.cargando = true;
  this.resultados = [];

  try {
    const res = await this.geminiService.obtenerOportunidadesDemo(
      this.enlaces,
      this.cantidad,
      this.fechaInicio,
      this.fechaLimite,
    );

    this.resultados = res;
    console.log('✅ Resultados:', res);
  } catch (err) {
    console.error("❌ Error al buscar oportunidades:", err);
  } finally {
    this.cargando = false;
  }
}


}
