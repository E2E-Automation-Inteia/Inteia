import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { TipoDeApoyo } from '../../../interfaces/TipoDeApoyo';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { TipoApoyoService } from './servicio/tipo-apoyo.service';

@Component({
  selector: 'app-tipo-apoyo',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './tipo-apoyo.component.html',
  styleUrl: './tipo-apoyo.component.css'
})
export class TipoApoyoComponent {
  ElementoSeleccionado: TipoDeApoyo = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: TipoDeApoyo[] = [];
  originalData: TipoDeApoyo[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: TipoApoyoService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): TipoDeApoyo {
    return {
      id: 0,
      nombre: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(TipoDeApoyo => TipoDeApoyo[filter.key as keyof any])))
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
      filtrados = filtrados.filter(TipoDeApoyo => {
        return this.filtrosActivos.every(filter => {
          const valor = TipoDeApoyo[filter.key as keyof TipoDeApoyo]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(TipoDeApoyo => {
        return Object.values(TipoDeApoyo).some(value =>
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



  abrirModal(e?: TipoDeApoyo) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(TipoDeApoyo: TipoDeApoyo) {
    if (TipoDeApoyo.id) {
      // actualizar
      this.servicio.update(TipoDeApoyo, TipoDeApoyo.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === TipoDeApoyo.id);
        if (idx !== -1) this.originalData[idx] = TipoDeApoyo;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(TipoDeApoyo).subscribe((nuevo: TipoDeApoyo) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string | number): void {
    if (!confirm('¿Estás seguro de eliminar este TipoDeApoyo?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
