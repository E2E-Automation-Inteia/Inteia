import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { Consultor } from '../../../interfaces/Consultor';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { ConsultoresService } from './servicio/consultores.service';

@Component({
  selector: 'app-consultores',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './consultores.component.html',
  styleUrl: './consultores.component.css'
})
export class ConsultoresComponent {
  ElementoSeleccionado: Consultor = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Consultor[] = [];
  originalData: Consultor[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: ConsultoresService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Consultor {
    return {
      empresaConsultora: '',
      areasConsultoria: '',
      servicios: '',
      ciudad: '',
      contacto: '',
      paginaWeb: '',
      notas: '',
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Consultor => Consultor[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Consultor => {
        return this.filtrosActivos.every(filter => {
          const valor = Consultor[filter.key as keyof Consultor]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Consultor => {
        return Object.values(Consultor).some(value =>
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



  abrirModal(e?: Consultor) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Consultor: Consultor) {
    if (Consultor.id) {
      // actualizar
      this.servicio.update(Consultor, Consultor.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === Consultor.id);
        if (idx !== -1) this.originalData[idx] = Consultor;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Consultor).subscribe((nuevo: Consultor) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este Consultor?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
