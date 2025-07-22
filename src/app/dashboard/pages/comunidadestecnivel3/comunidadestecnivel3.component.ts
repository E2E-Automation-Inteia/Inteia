import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { ComunidadTecNivel3 } from '../../../interfaces/ComunidadTecNivel3';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { Comunidadestecnivel3Service } from './servicio/comunidadestecnivel3.service';

@Component({
  selector: 'app-comunidadestecnivel3',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './comunidadestecnivel3.component.html',
  styleUrl: './comunidadestecnivel3.component.css'
})
export class Comunidadestecnivel3Component {
  ElementoSeleccionado: ComunidadTecNivel3 = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: ComunidadTecNivel3[] = [];
  originalData: ComunidadTecNivel3[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: Comunidadestecnivel3Service
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): ComunidadTecNivel3 {
    return {
      sector: '',
      ubicacion1: '',
      ubicacion2: '',
      tweetPitch: '',
      linkedIn: '',
      web: '',
      telefono: '',
      interesObservaciones: '',
      areaRelacionamiento: '',
      estrategiaNetworking: '',
      contacto1: '',
      contacto2: '',
      ctte: '',
      startupId: '',
      startup: null,
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(ComunidadTecNivel3 => ComunidadTecNivel3[filter.key as keyof any])))
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
      filtrados = filtrados.filter(ComunidadTecNivel3 => {
        return this.filtrosActivos.every(filter => {
          const valor = ComunidadTecNivel3[filter.key as keyof ComunidadTecNivel3]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(ComunidadTecNivel3 => {
        return Object.values(ComunidadTecNivel3).some(value =>
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



  abrirModal(e?: ComunidadTecNivel3) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(ComunidadTecNivel3: ComunidadTecNivel3) {
    if (ComunidadTecNivel3.id) {
      // actualizar
      this.servicio.update(ComunidadTecNivel3, ComunidadTecNivel3.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === ComunidadTecNivel3.id);
        if (idx !== -1) this.originalData[idx] = ComunidadTecNivel3;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(ComunidadTecNivel3).subscribe((nuevo: ComunidadTecNivel3) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este ComunidadTecNivel3?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
