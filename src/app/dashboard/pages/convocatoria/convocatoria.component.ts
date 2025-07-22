import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { Convocatoria } from '../../../interfaces/Convocatoria';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { ConvocatoriaService } from './servicio/convocatoria.service';

@Component({
  selector: 'app-convocatoria',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './convocatoria.component.html',
  styleUrl: './convocatoria.component.css'
})
export class ConvocatoriaComponent {
  ElementoSeleccionado: Convocatoria = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Convocatoria[] = [];
  originalData: Convocatoria[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: ConvocatoriaService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Convocatoria {
    return {
      nombre: '',
      a: 0,
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Convocatoria => Convocatoria[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Convocatoria => {
        return this.filtrosActivos.every(filter => {
          const valor = Convocatoria[filter.key as keyof Convocatoria]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Convocatoria => {
        return Object.values(Convocatoria).some(value =>
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



  abrirModal(e?: Convocatoria) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Convocatoria: Convocatoria) {
    if (Convocatoria.id) {
      // actualizar
      this.servicio.update(Convocatoria, Convocatoria.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === Convocatoria.id);
        if (idx !== -1) this.originalData[idx] = Convocatoria;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Convocatoria).subscribe((nuevo: Convocatoria) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este Convocatoria?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
