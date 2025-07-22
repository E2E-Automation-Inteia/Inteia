import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Evento } from '../../../interfaces/events.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventosService } from './services/evento.service';
import { ListComponent } from "../../../shared/components/list/list.component";
import { dinamycFilters } from '../../../interfaces/dinamycList';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, FormsModule, ListComponent],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {
  EventoSeleccionado: Evento = this.inicializarEvento();
  expandedRow: number | null = null;
  filtros: dinamycFilters[] = [
    { key: 'nombre', value: 'nombre', type: 'select', options: [] },
    { key: 'ciudad', value: 'ciudad', type: 'select', options: [] },
  ]
  columnas: string[] = ['nombre', 'areaConsultoria', 'fecha', 'ciudad', 'organizador', 'paginaWeb', 'notas'];
  data: Evento[] = [];

  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;
  constructor(private readonly http: HttpClient, private readonly eventoService: EventosService) { }

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
      this.data = data;

      this.filtros.forEach(filter => {
        if (filter.key === 'nombre') {
          const nombresUnicos = Array.from(new Set(data.map(evento => evento.nombre)))
            .filter(nombre => nombre);
          filter.options = nombresUnicos;
        }
        else if(filter.key === 'ciudad') {
          const nombresUnicos = Array.from(new Set(data.map(evento => evento.ciudad)))
            .filter(nombre => nombre);
          filter.options = nombresUnicos;
        }
      });
    });
  }

  aplicarFiltros(filtros: dinamycFilters[]): void {
    this.data= this.data.filter(evento => {
      return filtros.every(filter => {
        if (filter.type === 'text') {
          return (evento[filter.key as keyof Evento])?.toLowerCase().includes(filter.value.toLowerCase());
        } else if (filter.type === 'date') {
          return new Date(evento[filter.key as keyof Evento]) >= new Date(filter.value);
        }
        return true;
      });
    });
  }

  buscar(termino: string): void {
    this.data= this.data.filter(evento => {
      return Object.values(evento).some(value =>
        value.toString().toLowerCase().includes(termino.toLowerCase())
      );
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
          const idx = this.data.findIndex(e => e.id === this.EventoSeleccionado.id);
          if (idx !== -1) this.data[idx] = { ...this.EventoSeleccionado };
          this.cerrarModal();
        });
    } else {
      this.eventoService.create(this.EventoSeleccionado)
        .subscribe((nuevo: Evento) => {
          this.data.push(nuevo);
          this.cerrarModal();
        });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este evento?')) return;
    this.eventoService.delete(id)
      .subscribe(() => {
        this.data= this.data.filter(e => e.id !== id);
      });
  }
}
