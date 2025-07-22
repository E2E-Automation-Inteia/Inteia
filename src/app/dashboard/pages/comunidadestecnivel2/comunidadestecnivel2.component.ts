import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { ComunidadTecNivel2 } from '../../../interfaces/ComunidadTecNivel2';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { Comunidadestecnivel2Service } from './servicio/comunidadestecnivel2.service';

@Component({
  selector: 'app-comunidadestecnivel2',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './comunidadestecnivel2.component.html',
  styleUrl: './comunidadestecnivel2.component.css'
})
export class Comunidadestecnivel2Component {
  ElementoSeleccionado: ComunidadTecNivel2 = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: ComunidadTecNivel2[] = [];
  originalData: ComunidadTecNivel2[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: Comunidadestecnivel2Service
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): ComunidadTecNivel2 {
    return {
      nombre: '',
      descripcion: '',
      link: '',
      pais: '',
      industria: '',
      comunidadId: '',
      comunidad: null,
      startups: [],
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(ComunidadTecNivel2 => ComunidadTecNivel2[filter.key as keyof any])))
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
      filtrados = filtrados.filter(ComunidadTecNivel2 => {
        return this.filtrosActivos.every(filter => {
          const valor = ComunidadTecNivel2[filter.key as keyof ComunidadTecNivel2]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(ComunidadTecNivel2 => {
        return Object.values(ComunidadTecNivel2).some(value =>
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



  abrirModal(e?: ComunidadTecNivel2) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(ComunidadTecNivel2: ComunidadTecNivel2) {
    if (ComunidadTecNivel2.id) {
      // actualizar
      this.servicio.update(ComunidadTecNivel2, ComunidadTecNivel2.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === ComunidadTecNivel2.id);
        if (idx !== -1) this.originalData[idx] = ComunidadTecNivel2;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(ComunidadTecNivel2).subscribe((nuevo: ComunidadTecNivel2) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este ComunidadTecNivel2?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
