import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClasificacionGrupoService } from './services/clasificacion-grupo.service';
import { ClasificacionGrupo } from '../../../interfaces/ClasificacionGrupo';
import { ListComponent } from "../../../shared/components/list/list.component";
import { dinamycFilters } from '../../../interfaces/dinamycList';

@Component({
  selector: 'app-clasificacion-grupo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, ListComponent],
  templateUrl: './clasificacion-grupo.component.html',
  styleUrls: ['./clasificacion-grupo.component.css']
})
export class ClasificacionGrupoComponent {
  ElementoSeleccionado: ClasificacionGrupo = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: ClasificacionGrupo[] = [];
  originalData: ClasificacionGrupo[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: ClasificacionGrupoService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): ClasificacionGrupo {
    return {
      nombreClasificacion: '',
      descripcion: '',
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(ClasificacionGrupo => ClasificacionGrupo[filter.key as keyof any])))
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
      filtrados = filtrados.filter(ClasificacionGrupo => {
        return this.filtrosActivos.every(filter => {
          const valor = ClasificacionGrupo[filter.key as keyof ClasificacionGrupo]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(ClasificacionGrupo => {
        return Object.values(ClasificacionGrupo).some(value =>
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



  abrirModal(e?: ClasificacionGrupo) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(ClasificacionGrupo: ClasificacionGrupo) {
    if (ClasificacionGrupo.id) {
      // actualizar
      this.servicio.update(ClasificacionGrupo, ClasificacionGrupo.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === ClasificacionGrupo.id);
        if (idx !== -1) this.originalData[idx] = ClasificacionGrupo;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(ClasificacionGrupo).subscribe((nuevo: ClasificacionGrupo) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este ClasificacionGrupo?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
