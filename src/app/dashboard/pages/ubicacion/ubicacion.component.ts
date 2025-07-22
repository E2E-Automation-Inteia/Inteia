import { Component } from '@angular/core';
import { Ubicacion } from '../../../interfaces/Ubicacion';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { UbicacionService } from './servicio/ubicacion.service';
import { ListComponent } from "../../../shared/components/list/list.component";

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css'
})
export class UbicacionComponent {
  ElementoSeleccionado: Ubicacion = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Ubicacion[] = [];
  originalData: Ubicacion[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: UbicacionService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Ubicacion {
    return {
      municipio: '',
      departamento: '',
      region: '',
      pais: '',
      codDane: '',
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Ubicacion => Ubicacion[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Ubicacion => {
        return this.filtrosActivos.every(filter => {
          const valor = Ubicacion[filter.key as keyof Ubicacion]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Ubicacion => {
        return Object.values(Ubicacion).some(value =>
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



  abrirModal(e?: Ubicacion) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Ubicacion: Ubicacion) {
    if (Ubicacion.id) {
      // actualizar
      this.servicio.update(Ubicacion, Ubicacion.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === Ubicacion.id);
        if (idx !== -1) this.originalData[idx] = Ubicacion;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Ubicacion).subscribe((nuevo: Ubicacion) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este Ubicacion?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
