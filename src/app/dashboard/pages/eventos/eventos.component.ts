import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Evento } from '../../../interfaces/events.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventosService } from './services/evento.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, FormsModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {
  Eventos: Evento[] = [];
  EventoSeleccionado: Evento = this.inicializarEvento();
  expandedRow: number | null = null;

  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  constructor(private readonly http: HttpClient, private readonly eventoService: EventosService) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  inicializarEvento(): Evento {
    return {
      id: '',
      nombre: '',
      areaConsultoria: '',
      fecha: '',
      ciudad: '',
      organizador: '',
      paginaWeb: '',
      notas: ''
    };
  }

  obtenerEventos(): void {
    this.eventoService.get().subscribe((data: Evento[]) => {
      this.Eventos = data;
    });
  }

  abrirModal(e: Evento | null): void {
    this.EventoSeleccionado = e ? { ...e } : this.inicializarEvento();
    this.dialogRef.nativeElement.showModal();
  }

  cerrarModal(): void {
    this.dialogRef.nativeElement.close();
  }

  guardarCambios(): void {
    if (this.EventoSeleccionado.id) {
      this.eventoService.update(this.EventoSeleccionado, this.EventoSeleccionado.id)
        .subscribe(() => {
          const idx = this.Eventos.findIndex(e => e.id === this.EventoSeleccionado.id);
          if (idx !== -1) this.Eventos[idx] = { ...this.EventoSeleccionado };
          this.cerrarModal();
        });
    } else {
      this.eventoService.create(this.EventoSeleccionado)
        .subscribe((nuevo: Evento) => {
          this.Eventos.push(nuevo);
          this.cerrarModal();
        });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este evento?')) return;
    this.eventoService.delete(id)
      .subscribe(() => {
        this.Eventos = this.Eventos.filter(e => e.id !== id);
      });
  }
}
