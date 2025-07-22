import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { Instrumento } from '../../../interfaces/Instrumento';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { InstrumentoService } from './servicio/instrumento.service';

@Component({
  selector: 'app-instrumento',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './instrumento.component.html',
  styleUrl: './instrumento.component.css'
})
export class InstrumentoComponent {
 ElementoSeleccionado: Instrumento = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Instrumento[] = [];
  originalData: Instrumento[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: InstrumentoService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Instrumento {
    return {
  id: 0,
  nombre: '',
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
  }
};
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Instrumento => Instrumento[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Instrumento => {
        return this.filtrosActivos.every(filter => {
          const valor = Instrumento[filter.key as keyof Instrumento]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Instrumento => {
        return Object.values(Instrumento).some(value =>
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



  abrirModal(e?: Instrumento) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Instrumento: Instrumento) {
    if (Instrumento.id) {
      // actualizar
      this.servicio.update(Instrumento, Instrumento.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === Instrumento.id);
        if (idx !== -1) this.originalData[idx] = Instrumento;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Instrumento).subscribe((nuevo: Instrumento) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string | number): void {
    if (!confirm('¿Estás seguro de eliminar este Instrumento?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
