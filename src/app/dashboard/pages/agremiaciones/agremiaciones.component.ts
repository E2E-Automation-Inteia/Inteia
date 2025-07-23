import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { Agremiaciones } from '../../../interfaces/Agremiaciones';
import { AgremiacionesService } from './servicio/agremiaciones.service';

@Component({
  selector: 'app-agremiaciones',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './agremiaciones.component.html',
  styleUrl: './agremiaciones.component.css'
})
export class AgremiacionesComponent {
  ElementoSeleccionado: Agremiaciones = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Agremiaciones[] = [];
  originalData: Agremiaciones[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: AgremiacionesService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Agremiaciones {
    return {
      vinculadorId: '',
      sigla: '',
      razonSocial: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Agremiaciones => Agremiaciones[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Agremiaciones => {
        return this.filtrosActivos.every(filter => {
          const valor = Agremiaciones[filter.key as keyof Agremiaciones]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Agremiaciones => {
        return Object.values(Agremiaciones).some(value =>
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



  abrirModal(e?: Agremiaciones) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Agremiaciones: Agremiaciones) {
    if (Agremiaciones.vinculadorId) {
      // actualizar
      this.servicio.update(Agremiaciones, Agremiaciones.vinculadorId).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.vinculadorId === Agremiaciones.vinculadorId);
        if (idx !== -1) this.originalData[idx] = Agremiaciones;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Agremiaciones).subscribe((nuevo: Agremiaciones) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este Agremiaciones?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.vinculadorId !== id);
      this.actualizarData();
    });
  }
}
