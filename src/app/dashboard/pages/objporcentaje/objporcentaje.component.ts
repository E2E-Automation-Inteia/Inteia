import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { ObjPorcentaje } from '../../../interfaces/ObjPorcentaje';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { ObjporcentajeService } from './servicio/objporcentaje.service';

@Component({
  selector: 'app-objporcentaje',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './objporcentaje.component.html',
  styleUrl: './objporcentaje.component.css'
})
export class ObjporcentajeComponent {
  ElementoSeleccionado: ObjPorcentaje = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: ObjPorcentaje[] = [];
  originalData: ObjPorcentaje[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: ObjporcentajeService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): ObjPorcentaje {
    return {
      id: 0,
      porcentaje: 0,
      objetivoId: 0,
      objetivo: {
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
      }
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(ObjPorcentaje => ObjPorcentaje[filter.key as keyof any])))
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
      filtrados = filtrados.filter(ObjPorcentaje => {
        return this.filtrosActivos.every(filter => {
          const valor = ObjPorcentaje[filter.key as keyof ObjPorcentaje]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(ObjPorcentaje => {
        return Object.values(ObjPorcentaje).some(value =>
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



  abrirModal(e?: ObjPorcentaje) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(ObjPorcentaje: ObjPorcentaje) {
    if (ObjPorcentaje.id) {
      // actualizar
      this.servicio.update(ObjPorcentaje, ObjPorcentaje.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === ObjPorcentaje.id);
        if (idx !== -1) this.originalData[idx] = ObjPorcentaje;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(ObjPorcentaje).subscribe((nuevo: ObjPorcentaje) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string | number): void {
    if (!confirm('¿Estás seguro de eliminar este ObjPorcentaje?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
