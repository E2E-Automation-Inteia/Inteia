import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { CamaraDeComercio } from '../../../interfaces/CamaraDeComercio';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { CamaradecomercioService } from './servicio/camaradecomercio.service';

@Component({
  selector: 'app-camaradecomercio',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './camaradecomercio.component.html',
  styleUrl: './camaradecomercio.component.css'
})
export class CamaradecomercioComponent {
  ElementoSeleccionado: CamaraDeComercio = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: CamaraDeComercio[] = [];
  originalData: CamaraDeComercio[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: CamaradecomercioService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): CamaraDeComercio {
    return {
  vinculadorId: '',
  cargo: '',
  municipio: '',
  lider: ''
};
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(CamaraDeComercio => CamaraDeComercio[filter.key as keyof any])))
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
      filtrados = filtrados.filter(CamaraDeComercio => {
        return this.filtrosActivos.every(filter => {
          const valor = CamaraDeComercio[filter.key as keyof CamaraDeComercio]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(CamaraDeComercio => {
        return Object.values(CamaraDeComercio).some(value =>
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



  abrirModal(e?: CamaraDeComercio) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(CamaraDeComercio: CamaraDeComercio) {
    if (CamaraDeComercio.vinculadorId) {
      // actualizar
      this.servicio.update(CamaraDeComercio, CamaraDeComercio.vinculadorId).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.vinculadorId === CamaraDeComercio.vinculadorId);
        if (idx !== -1) this.originalData[idx] = CamaraDeComercio;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(CamaraDeComercio).subscribe((nuevo: CamaraDeComercio) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este CamaraDeComercio?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.vinculadorId !== id);
      this.actualizarData();
    });
  }
}
