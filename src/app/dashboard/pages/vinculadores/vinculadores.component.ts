import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListComponent } from '../../../shared/components/list/list.component';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { VinculadoresService } from './servicio/vinculadores.service';
import { TipoVinculador, Vinculador } from '../../../interfaces/Vinculador';


@Component({
  selector: 'app-vinculadores',
  standalone: true,
  imports: [CommonModule, FormsModule, ListComponent],
  templateUrl: './vinculadores.component.html',
  styleUrls: ['./vinculadores.component.css']
})
export class VinculadoresComponent implements OnInit {
  ElementoSeleccionado: Vinculador = this.inicializar();

  expandedRow: number | null = null;
  filtros: dinamycFilters[] = []

  columnas: string[] = Object.keys(this.inicializar());

  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalElementos: number = 0;

  data: Vinculador[] = [];
  originalData: Vinculador[] = [];
  terminoBusqueda: string = '';
  filtrosActivos: dinamycFilters[] = [];

  constructor(
    private readonly servicio: VinculadoresService
  ) { }

  ngOnInit(): void {
    this.obtenerElementos();
  }

  inicializar(): Vinculador {
    return {
      tipo: TipoVinculador.Agremiaciones,
      nombre: '',
      ciudad: '',
      direccion: '',
      telefono: '',
      correo: '',
      web: '',
      id: ''
    };
  }

  obtenerElementos(): void {
    this.servicio.get().subscribe((data: any[]) => {
      this.originalData = [...data];
      this.data = [...data];

      this.totalElementos = data.length;

      this.filtros.forEach(filter => {
        const valoresUnicos = Array.from(new Set(data.map(Vinculador => Vinculador[filter.key as keyof any])))
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
      filtrados = filtrados.filter(Vinculador => {
        return this.filtrosActivos.every(filter => {
          const valor = Vinculador[filter.key as keyof Vinculador]?.toString().toLowerCase();
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
      filtrados = filtrados.filter(Vinculador => {
        return Object.values(Vinculador).some(value =>
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



  abrirModal(e?: Vinculador) {
    this.ElementoSeleccionado = e ? { ...e } : this.inicializar();
  }


  guardarDesdeModal(Vinculador: Vinculador) {
    if (Vinculador.id) {
      // actualizar
      this.servicio.update(Vinculador, Vinculador.id).subscribe(() => {
        const idx = this.originalData.findIndex(e => e.id === Vinculador.id);
        if (idx !== -1) this.originalData[idx] = Vinculador;
        this.actualizarData();
      });
    } else {
      // crear
      this.servicio.create(Vinculador).subscribe((nuevo: Vinculador) => {
        this.originalData.push(nuevo);
        this.actualizarData();
      });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este Vinculador?')) return;
    this.servicio.delete(id).subscribe(() => {
      this.originalData = this.originalData.filter(e => e.id !== id);
      this.actualizarData();
    });
  }
}
