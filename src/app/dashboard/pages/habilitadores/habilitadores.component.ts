import { Component } from '@angular/core';
import { Habilitadores } from '../../../interfaces/Habilitadores';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { HabilitadoresService } from './servicio/habilitadores.service';
import { ListComponent } from "../../../shared/components/list/list.component";

@Component({
  selector: 'app-habilitadores',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './habilitadores.component.html',
  styleUrl: './habilitadores.component.css'
})
export class HabilitadoresComponent {
  ElementoSeleccionado: Habilitadores = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Habilitadores[] = [];
  originalData: Habilitadores[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: HabilitadoresService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Habilitadores {
    return {
      contenido: '',
      basesDeDatos: '',
      fondosRedesFamilyOffices: '',
      redesAgremiaciones: '',
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Habilitadores => Habilitadores[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Habilitadores => {
        return this.filtrosActivos.every(filter => {
          const valor = Habilitadores[filter.key as keyof Habilitadores]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Habilitadores => {
        return Object.values(Habilitadores).some(value =>
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



  abrirModal(e?: Habilitadores) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Habilitadores: Habilitadores) {
    if (Habilitadores.id) {
      // actualizar
      this.servicio.update(Habilitadores, Habilitadores.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === Habilitadores.id);
        if (idx !== -1) this.originalData[idx] = Habilitadores;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Habilitadores).subscribe((nuevo: Habilitadores) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este Habilitadores?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
