import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { ProgramasColciencias } from '../../../interfaces/ProgramasColciencias';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { ProgramascolcienciasService } from './servicio/programascolciencias.service';

@Component({
  selector: 'app-programascolciencias',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './programascolciencias.component.html',
  styleUrl: './programascolciencias.component.css'
})
export class ProgramascolcienciasComponent {
  ElementoSeleccionado: ProgramasColciencias = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: ProgramasColciencias[] = [];
  originalData: ProgramasColciencias[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: ProgramascolcienciasService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): ProgramasColciencias {
    return {
      nombreProgramaColciencias: '',
      codigo: '',
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(ProgramasColciencias => ProgramasColciencias[filter.key as keyof any])))
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
      filtrados = filtrados.filter(ProgramasColciencias => {
        return this.filtrosActivos.every(filter => {
          const valor = ProgramasColciencias[filter.key as keyof ProgramasColciencias]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(ProgramasColciencias => {
        return Object.values(ProgramasColciencias).some(value =>
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



  abrirModal(e?: ProgramasColciencias) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(ProgramasColciencias: ProgramasColciencias) {
    if (ProgramasColciencias.id) {
      // actualizar
      this.servicio.update(ProgramasColciencias, ProgramasColciencias.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === ProgramasColciencias.id);
        if (idx !== -1) this.originalData[idx] = ProgramasColciencias;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(ProgramasColciencias).subscribe((nuevo: ProgramasColciencias) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este ProgramasColciencias?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
