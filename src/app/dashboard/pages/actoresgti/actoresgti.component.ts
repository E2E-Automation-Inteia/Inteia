import { Component } from '@angular/core';
import { ActoresgtiService } from './servicio/actoresgti.service';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { ActoresCTI } from '../../../interfaces/ActorGTI';
import { ListComponent } from "../../../shared/components/list/list.component";

@Component({
  selector: 'app-actoresgti',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './actoresgti.component.html',
  styleUrl: './actoresgti.component.css'
})
export class ActoresgtiComponent {
  ElementoSeleccionado: ActoresCTI = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: ActoresCTI[] = [];
  originalData: ActoresCTI[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: ActoresgtiService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): ActoresCTI {
    return {
      interesInteia: '',
      nombreEntidad: '',
      nombreActor: '',
      reconocidoComo: '',
      ciudadDepartamento: '',
      paginaWeb: '',
      sector: '',
      resolucion: '',
      fechaExpedicion: null,
      fechaNotificacion: null,
      vigenciaHasta: null,
      grupoInvestigacionId: '',
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(ActoresCTI => ActoresCTI[filter.key as keyof any])))
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
      filtrados = filtrados.filter(ActoresCTI => {
        return this.filtrosActivos.every(filter => {
          const valor = ActoresCTI[filter.key as keyof ActoresCTI]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(ActoresCTI => {
        return Object.values(ActoresCTI).some(value =>
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



  abrirModal(e?: ActoresCTI) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(ActoresCTI: ActoresCTI) {
    if (ActoresCTI.id) {
      // actualizar
      this.servicio.update(ActoresCTI, ActoresCTI.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === ActoresCTI.id);
        if (idx !== -1) this.originalData[idx] = ActoresCTI;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(ActoresCTI).subscribe((nuevo: ActoresCTI) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este ActoresCTI?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
