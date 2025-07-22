import { Component } from '@angular/core';
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
    { key: 'nombre', value: '', type: 'select', options: [] },
    { key: 'ciudad', value: '', type: 'select', options: [] },
  ]

  columnas: string[] = ['nombre', 'areaConsultoria', 'fecha', 'ciudad', 'organizador', 'paginaWeb', 'notas'];

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Evento[] = [];
  originalData: Evento[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly eventoService: EventosService,
  ) { }

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
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(evento => evento[filter.key as keyof Evento])))
          .filter(val => val);
        filter.options = valoresUnicos;
      });
    });
  }

  buscar(termino: string): void {
    this.terminoBusqueda = termino;
    this.actualizarData();
  }

  aplicarFiltros(filtros: dinamycFilters[]): void {
    this.filtrosActivos = filtros;
    this.actualizarData();
  }
  actualizarData(): void {
    let filtrados = [...this.originalData];

    if (this.filtrosActivos.length > 0) {
      filtrados = filtrados.filter(evento => {
        return this.filtrosActivos.every(filter => {
          const valor = evento[filter.key as keyof Evento]?.toString().toLowerCase();
          const valorFiltro = filter.value.toLowerCase();

          if (filter.type === 'text' || filter.type === 'select') {
            return valor?.includes(valorFiltro);
          } else if (filter.type === 'date') {
            return new Date(valor || '') >= new Date(valorFiltro);
          }

          return true;
        });
      });
    }

    if (this.terminoBusqueda) {
      filtrados = filtrados.filter(evento => {
        return Object.values(evento).some(value =>
          value?.toString().toLowerCase().includes(this.terminoBusqueda)
        );
      });
    }

    this.data = filtrados;
  }

  reset(): void {
    this.filtrosActivos = [];
    this.terminoBusqueda = '';
    this.paginaActual = 1;

    this.filtros = this.filtros.map(f => ({
      key: f.key,
      value: '',
      type: f.type,
      options: [...f.options || []]
    }));

    this.actualizarData();
  }



  abrirModal(e?: Evento) {
    this.EventoSeleccionado = e ? { ...e } : this.inicializarEvento();
  }


  guardarEventoDesdeModal(evento: Evento) {
    if (evento.id) {
      // actualizar
      this.eventoService.update(evento, evento.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === evento.id);
        if (idx !== -1) this.originalData[idx] = evento;
        this.actualizarData();
      });
    } else {
      // crear
      this.eventoService.create(evento).subscribe((nuevo: Evento) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

    eliminar(id: string): void {
      if(!confirm('¿Estás seguro de eliminar este evento?')) return;
    this.eventoService.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
