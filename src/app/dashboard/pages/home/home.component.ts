import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Oportunidad {
  id: string;
  esPostulable: boolean;
  idProceso: string;
  descripcion: string;
  fechaMaximaPostulacion: string;
  departamento: string;
  aspectosImportantes: string[];
  urlConvocatoria: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  oportunidades: Oportunidad[] = [];
  expandedRow: number | null = null;
  oportunidadSeleccionada: Oportunidad = this.inicializarOportunidad();

  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOportunidades();
  }

  fetchOportunidades(): void {
    this.http.get<Oportunidad[]>('http://localhost:5234/api/oportunidades')
      .subscribe(data => this.oportunidades = data);
  }

  abrirModal(oportunidad: Oportunidad): void {
    this.oportunidadSeleccionada = { ...oportunidad }; // Copia para no mutar
    this.dialogRef.nativeElement.showModal();
  }

  cerrarModal(): void {
    this.dialogRef.nativeElement.close();
  }

  guardarCambios(): void {
    const id = this.oportunidadSeleccionada.id;
    this.http.put(`http://localhost:5234/api/oportunidades/${id}`, this.oportunidadSeleccionada)
      .subscribe({
        next: () => {
          const idx = this.oportunidades.findIndex(o => o.id === id);
          if (idx !== -1) this.oportunidades[idx] = { ...this.oportunidadSeleccionada };
          this.cerrarModal();
        },
        error: err => console.error('Error al guardar', err)
      });
  }

  inicializarOportunidad(): Oportunidad {
    return {
      id: '',
      esPostulable: true,
      idProceso: '',
      descripcion: '',
      fechaMaximaPostulacion: '',
      departamento: '',
      aspectosImportantes: [],
      urlConvocatoria: ''
    };
  }

  toggleExpand(index: number): void {
    this.expandedRow = this.expandedRow === index ? null : index;
  }

  togglePostulable(index: number): void {
    const o = this.oportunidades[index];
    o.esPostulable = !o.esPostulable;
    this.http.put(`http://localhost:5234/api/oportunidades/${o.id}`, o)
      .subscribe();
  }
}
  