import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { Objetivo } from '../../../interfaces/Objetivo';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { ObjetivoService } from './servicio/objetivo.service';

@Component({
  selector: 'app-objetivo',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './objetivo.component.html',
  styleUrl: './objetivo.component.css'
})
export class ObjetivoComponent {
  ElementoSeleccionado: Objetivo = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Objetivo[] = [];
  originalData: Objetivo[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: ObjetivoService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Objetivo {
    return {
      id: 0,
      descripcion: '',
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
      },
      objPorcentaje: null
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Objetivo => Objetivo[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Objetivo => {
        return this.filtrosActivos.every(filter => {
          const valor = Objetivo[filter.key as keyof Objetivo]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Objetivo => {
        return Object.values(Objetivo).some(value =>
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



  abrirModal(e?: Objetivo) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Objetivo: Objetivo) {
    if (Objetivo.id) {
      // actualizar
      this.servicio.update(Objetivo, Objetivo.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === Objetivo.id);
        if (idx !== -1) this.originalData[idx] = Objetivo;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Objetivo).subscribe((nuevo: Objetivo) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string | number): void {
    if (!confirm('¿Estás seguro de eliminar este Objetivo?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
