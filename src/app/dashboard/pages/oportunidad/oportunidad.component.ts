import { Component } from '@angular/core';
import { Oportunidad } from '../../../interfaces/Oportunidad';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { OportunidadService } from './servicio/oportunidad.service';
import { ListComponent } from "../../../shared/components/list/list.component";

@Component({
  selector: 'app-oportunidad',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './oportunidad.component.html',
  styleUrl: './oportunidad.component.css'
})
export class OportunidadComponent {
  ElementoSeleccionado: Oportunidad = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Oportunidad[] = [];
  originalData: Oportunidad[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: OportunidadService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Oportunidad {
    return {
      esPostulable: false,
      idProceso: '',
      descripcion: '',
      fechaMaximaPostulacion: '',
      departamento: '',
      aspectosImportantes: [],
      urlConvocatoria: '',
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Oportunidad => Oportunidad[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Oportunidad => {
        return this.filtrosActivos.every(filter => {
          const valor = Oportunidad[filter.key as keyof Oportunidad]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Oportunidad => {
        return Object.values(Oportunidad).some(value =>
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



  abrirModal(e?: Oportunidad) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Oportunidad: Oportunidad) {
    if (Oportunidad.id) {
      // actualizar
      this.servicio.update(Oportunidad, Oportunidad.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === Oportunidad.id);
        if (idx !== -1) this.originalData[idx] = Oportunidad;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Oportunidad).subscribe((nuevo: Oportunidad) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este Oportunidad?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
