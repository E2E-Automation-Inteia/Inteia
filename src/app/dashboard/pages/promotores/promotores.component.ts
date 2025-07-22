import { Component } from '@angular/core';
import { Promotores } from '../../../interfaces/Promotores';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { PromotoresService } from './servicio/promotores.service';
import { ListComponent } from "../../../shared/components/list/list.component";

@Component({
  selector: 'app-promotores',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './promotores.component.html',
  styleUrl: './promotores.component.css'
})
export class PromotoresComponent {
  ElementoSeleccionado: Promotores = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Promotores[] = [];
  originalData: Promotores[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: PromotoresService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Promotores {
    return {
      medio: '',
      descripcion: '',
      direccion: '',
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Promotores => Promotores[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Promotores => {
        return this.filtrosActivos.every(filter => {
          const valor = Promotores[filter.key as keyof Promotores]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Promotores => {
        return Object.values(Promotores).some(value =>
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



  abrirModal(e?: Promotores) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Promotores: Promotores) {
    if (Promotores.id) {
      // actualizar
      this.servicio.update(Promotores, Promotores.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === Promotores.id);
        if (idx !== -1) this.originalData[idx] = Promotores;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Promotores).subscribe((nuevo: Promotores) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este Promotores?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
