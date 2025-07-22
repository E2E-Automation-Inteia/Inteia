import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { ComunidadTecNivel1 } from '../../../interfaces/ComunidadTecNivel1';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { Comunidadestecnivel1Service } from './servicio/comunidadestecnivel1.service';

@Component({
  selector: 'app-comunidadestecnivel1',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './comunidadestecnivel1.component.html',
  styleUrl: './comunidadestecnivel1.component.css'
})
export class Comunidadestecnivel1Component {
 ElementoSeleccionado: ComunidadTecNivel1 = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: ComunidadTecNivel1[] = [];
  originalData: ComunidadTecNivel1[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: Comunidadestecnivel1Service
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): ComunidadTecNivel1 {
    return {
  nombre: '',
  gratuitaOPagada: '',
  actividad: '',
  lugar: '',
  contactos: '',
  id: ''
};
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(ComunidadTecNivel1 => ComunidadTecNivel1[filter.key as keyof any])))
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
      filtrados = filtrados.filter(ComunidadTecNivel1 => {
        return this.filtrosActivos.every(filter => {
          const valor = ComunidadTecNivel1[filter.key as keyof ComunidadTecNivel1]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(ComunidadTecNivel1 => {
        return Object.values(ComunidadTecNivel1).some(value =>
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



  abrirModal(e?: ComunidadTecNivel1) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(ComunidadTecNivel1: ComunidadTecNivel1) {
    if (ComunidadTecNivel1.id) {
      // actualizar
      this.servicio.update(ComunidadTecNivel1, ComunidadTecNivel1.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === ComunidadTecNivel1.id);
        if (idx !== -1) this.originalData[idx] = ComunidadTecNivel1;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(ComunidadTecNivel1).subscribe((nuevo: ComunidadTecNivel1) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este ComunidadTecNivel1?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
