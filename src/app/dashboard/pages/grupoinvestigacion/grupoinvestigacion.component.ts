import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { GrupoInvestigacion } from '../../../interfaces/GrupoInvestigacion';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { GrupoinvestigacionService } from './servicio/grupoinvestigacion.service';

@Component({
  selector: 'app-grupoinvestigacion',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './grupoinvestigacion.component.html',
  styleUrl: './grupoinvestigacion.component.css'
})
export class GrupoinvestigacionComponent {
  ElementoSeleccionado: GrupoInvestigacion = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: GrupoInvestigacion[] = [];
  originalData: GrupoInvestigacion[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: GrupoinvestigacionService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): GrupoInvestigacion {
    return {
      nombre: '',
      codigo: '',
      lider: '',
      institucional: false,
      clasificacionGrupoId: '',
      programasColcienciasId: '',
      activo: false,
      fechaCreacion: '',
      usuarioCreacion: '',
      usuarioModificacion: '',
      fechaModificacion: null,
      ubicacionId: '',
      actoresCTIIds: '',
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(GrupoInvestigacion => GrupoInvestigacion[filter.key as keyof any])))
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
      filtrados = filtrados.filter(GrupoInvestigacion => {
        return this.filtrosActivos.every(filter => {
          const valor = GrupoInvestigacion[filter.key as keyof GrupoInvestigacion]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(GrupoInvestigacion => {
        return Object.values(GrupoInvestigacion).some(value =>
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



  abrirModal(e?: GrupoInvestigacion) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(GrupoInvestigacion: GrupoInvestigacion) {
    if (GrupoInvestigacion.id) {
      // actualizar
      this.servicio.update(GrupoInvestigacion, GrupoInvestigacion.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === GrupoInvestigacion.id);
        if (idx !== -1) this.originalData[idx] = GrupoInvestigacion;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(GrupoInvestigacion).subscribe((nuevo: GrupoInvestigacion) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este GrupoInvestigacion?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
