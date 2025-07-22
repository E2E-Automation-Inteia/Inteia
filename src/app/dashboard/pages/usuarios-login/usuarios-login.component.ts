import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { Rol, UsuarioLogin } from '../../../interfaces/UsuarioLogin';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { UsuariosLoginService } from './servicio/usuarios-login.service';

@Component({
  selector: 'app-usuarios-login',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './usuarios-login.component.html',
  styleUrl: './usuarios-login.component.css'
})
export class UsuariosLoginComponent {
  ElementoSeleccionado: UsuarioLogin = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: UsuarioLogin[] = [];
  originalData: UsuarioLogin[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: UsuariosLoginService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): UsuarioLogin {
    return {
      id: '',
      email: '',
      passwordHash: '',
      rol: Rol.root,
      isActive: false,
      creationDate: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(UsuarioLogin => UsuarioLogin[filter.key as keyof any])))
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
      filtrados = filtrados.filter(UsuarioLogin => {
        return this.filtrosActivos.every(filter => {
          const valor = UsuarioLogin[filter.key as keyof UsuarioLogin]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(UsuarioLogin => {
        return Object.values(UsuarioLogin).some(value =>
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



  abrirModal(e?: UsuarioLogin) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(UsuarioLogin: UsuarioLogin) {
    if (UsuarioLogin.id) {
      // actualizar
      this.servicio.update(UsuarioLogin, UsuarioLogin.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === UsuarioLogin.id);
        if (idx !== -1) this.originalData[idx] = UsuarioLogin;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(UsuarioLogin).subscribe((nuevo: UsuarioLogin) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este UsuarioLogin?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
