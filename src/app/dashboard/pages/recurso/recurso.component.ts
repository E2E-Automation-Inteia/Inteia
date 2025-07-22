import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { Recurso } from '../../../interfaces/Recurso';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { RecursoService } from './servicio/recurso.service';

@Component({
  selector: 'app-recurso',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './recurso.component.html',
  styleUrl: './recurso.component.css'
})
export class RecursoComponent {
  ElementoSeleccionado: Recurso = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Recurso[] = [];
  originalData: Recurso[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: RecursoService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Recurso {
    return {
      id: 0,
      nombre: '',
      portfolioId: 0,
      portfolio: {
        id: 0,
        nombre: '',
        fechaApertura: '',
        fechaCierre: '',
        usuarioId: '',
        usuario: {
          id: '',
          isActive: false
        },
        objetivos: [],
        recursos: [],
        instrumentos: []
      }
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Recurso => Recurso[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Recurso => {
        return this.filtrosActivos.every(filter => {
          const valor = Recurso[filter.key as keyof Recurso]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Recurso => {
        return Object.values(Recurso).some(value =>
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



  abrirModal(e?: Recurso) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Recurso: Recurso) {
    if (Recurso.id) {
      // actualizar
      this.servicio.update(Recurso, Recurso.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === Recurso.id);
        if (idx !== -1) this.originalData[idx] = Recurso;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Recurso).subscribe((nuevo: Recurso) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string | number): void {
    if (!confirm('¿Estás seguro de eliminar este Recurso?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
