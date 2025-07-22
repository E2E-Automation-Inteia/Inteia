import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { FormsModule } from '@angular/forms';
import { TrucatePipe } from '../../pipe/trucate.pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TrucatePipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {

  // propiedades para el titulos y titulos medios
  @Input() TituloTabla: string = 'No ingreso nombre de tabla';

  // propiedades para los filtros
  @Input() filters: dinamycFilters[] = [];
  @Output() filterChanged = new EventEmitter<dinamycFilters[]>();
  @Output() searchChanged = new EventEmitter<string>();

  searchTerm: string = '';

  // propiedades para las tablas
  @Input() columnas: string[] = []; 
  @Input() data: any[] = [];        
  @Output() onEditar = new EventEmitter<any>();
  @Output() onEliminar = new EventEmitter<any>();
  @Output() onsave = new EventEmitter<any>();

  // metodo para abrir el modal
  @Input() dialogRef!: ElementRef<HTMLDialogElement>;
  @Input() selected: any = {};
  value: { [key: string]: any } = {};


  // metodos para los filtros
  onFilterChange() {
    this.filterChanged.emit(this.filters);
  }

  onSearchChange() {
    this.searchChanged.emit(this.searchTerm);
  }

  // metodos para las tablas
  editar(item: any) {
    this.onEditar.emit(item);
  }

  eliminar(item: any) {
    this.onEliminar.emit(item);
  }

  save(item: any) {
    this.onsave.emit(item);
  }

  //metodo para modal
  cerrarModal(): void {
    this.dialogRef.nativeElement.close();
  }

}
