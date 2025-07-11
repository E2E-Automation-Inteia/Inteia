import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Vinculador {
  id: string;
  nombre: string;
  ciudad: string;
  correo: string;
}

@Component({
  selector: 'app-vinculadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vinculadores.component.html',
  styleUrls: ['./vinculadores.component.css']
})
export class VinculadoresComponent implements OnInit {
  vinculadores: Vinculador[] = [];
  vinculadorSeleccionado: Vinculador = this.inicializarVinculador();
  expandedRow: number | null = null;

  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.obtenerVinculadores();
  }

  inicializarVinculador(): Vinculador {
    return {
      id: '',
      nombre: '',
      ciudad: '',
      correo: ''
    };
  }

  obtenerVinculadores(): void {
    this.http.get<Vinculador[]>('http://localhost:5234/api/Vinculadores')
      .subscribe(data => this.vinculadores = data);
  }

  abrirModal(v: Vinculador | null): void {
    this.vinculadorSeleccionado = v ? { ...v } : this.inicializarVinculador();
    this.dialogRef.nativeElement.showModal();
  }

  cerrarModal(): void {
    this.dialogRef.nativeElement.close();
  }

  guardarCambios(): void {
    if (this.vinculadorSeleccionado.id) {
      this.http.put(`http://localhost:5234/api/Vinculadores`, this.vinculadorSeleccionado)
        .subscribe(() => {
          const idx = this.vinculadores.findIndex(v => v.id === this.vinculadorSeleccionado.id);
          if (idx !== -1) this.vinculadores[idx] = { ...this.vinculadorSeleccionado };
          this.cerrarModal();
        });
    } else {
      this.http.post<Vinculador>('http://localhost:5234/api/Vinculadores', this.vinculadorSeleccionado)
        .subscribe((nuevo: Vinculador) => {
          this.vinculadores.push(nuevo);
          this.cerrarModal();
        });
    }
  }

  eliminar(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este vinculador?')) return;
    this.http.delete(`/api/Vinculadores/${id}`)
      .subscribe(() => {
        this.vinculadores = this.vinculadores.filter(v => v.id !== id);
      });
  }
}
