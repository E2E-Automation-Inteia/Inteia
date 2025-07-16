import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClasificacionGrupoService } from './services/clasificacion-grupo.service';
import { ClasificacionGrupo } from '../../../interfaces/ClasificacionGrupo';

@Component({
  selector: 'app-clasificacion-grupo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule],
  templateUrl: './clasificacion-grupo.component.html',
  styleUrls: ['./clasificacion-grupo.component.css']
})
export class ClasificacionGrupoComponent {
  grupos: ClasificacionGrupo[] = [];
  grupoSeleccionado: ClasificacionGrupo = this.inicializarGrupo();
  expandedRow: number | null = null;

  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  constructor(private readonly grupoService: ClasificacionGrupoService) {}

  ngOnInit(): void {
    this.obtenerGrupos();
  }

  inicializarGrupo(): ClasificacionGrupo {
    return {
  nombreClasificacion: '',
  descripcion: '',
  id: ''
};
  }

  obtenerGrupos(): void {
    this.grupoService.get().subscribe((data: ClasificacionGrupo[]) => {
      this.grupos = data;
    });
  }

  abrirModal(grupo: ClasificacionGrupo | null): void {
    this.grupoSeleccionado = grupo ? { ...grupo } : this.inicializarGrupo();
    this.dialogRef.nativeElement.showModal();
  }

  cerrarModal(): void {
    this.dialogRef.nativeElement.close();
  }

  guardarCambios(): void {
    if (this.grupoSeleccionado.id) {
      this.grupoService.update(this.grupoSeleccionado, this.grupoSeleccionado.id)
        .subscribe(() => {
          const idx = this.grupos.findIndex(g => g.id === this.grupoSeleccionado.id);
          if (idx !== -1) this.grupos[idx] = { ...this.grupoSeleccionado };
          this.cerrarModal();
        });
    } else {
      this.grupoService.create(this.grupoSeleccionado)
        .subscribe((nuevo: ClasificacionGrupo) => {
          this.grupos.push(nuevo);
          this.cerrarModal();
        });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este grupo?')) return;
    this.grupoService.delete(id)
      .subscribe(() => {
        this.grupos = this.grupos.filter(g => g.id !== id);
      });
  }
}
