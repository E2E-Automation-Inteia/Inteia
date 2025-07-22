import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { Usuario } from '../../../interfaces/Usuario';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { UsuariosService } from './servicio/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
 ElementoSeleccionado: Usuario = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Usuario[] = [];
  originalData: Usuario[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: UsuariosService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Usuario {
    return {
  id: '',
  isActive: false
};
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Usuario => Usuario[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Usuario => {
        return this.filtrosActivos.every(filter => {
          const valor = Usuario[filter.key as keyof Usuario]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Usuario => {
        return Object.values(Usuario).some(value =>
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



  abrirModal(e?: Usuario) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Usuario: Usuario) {
    if (Usuario.id) {
      // actualizar
      this.servicio.update(Usuario, Usuario.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === Usuario.id);
        if (idx !== -1) this.originalData[idx] = Usuario;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Usuario).subscribe((nuevo: Usuario) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este Usuario?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
