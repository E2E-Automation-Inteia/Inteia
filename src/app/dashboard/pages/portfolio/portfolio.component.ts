import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { Portfolio } from '../../../interfaces/Portfolio';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { PortfolioService } from './servicio/portfolio.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  ElementoSeleccionado: Portfolio = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Portfolio[] = [];
  originalData: Portfolio[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: PortfolioService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Portfolio {
    return {
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
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Portfolio => Portfolio[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Portfolio => {
        return this.filtrosActivos.every(filter => {
          const valor = Portfolio[filter.key as keyof Portfolio]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Portfolio => {
        return Object.values(Portfolio).some(value =>
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



  abrirModal(e?: Portfolio) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Portfolio: Portfolio) {
    if (Portfolio.id) {
      // actualizar
      this.servicio.update(Portfolio, Portfolio.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === Portfolio.id);
        if (idx !== -1) this.originalData[idx] = Portfolio;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Portfolio).subscribe((nuevo: Portfolio) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string | number): void {
    if (!confirm('¿Estás seguro de eliminar este Portfolio?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
