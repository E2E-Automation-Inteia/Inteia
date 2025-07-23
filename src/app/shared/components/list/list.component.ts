import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { dinamycFilters } from '../../../interfaces/dinamycList';
import { FormsModule } from '@angular/forms';
import { TrucatePipe } from '../../pipe/trucate.pipe';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TrucatePipe, MatIcon],
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
  @Output() clearFiltersEvent = new EventEmitter<void>();


  searchTerm: string = '';

  // propiedades para las tablas
  @Input() columnas: string[] = [];
  @Input() data: any[] = [];
  @Output() onEditar = new EventEmitter<any>();
  @Output() onEliminar = new EventEmitter<any>();
  @Output() onsave = new EventEmitter<any>();

  // propiedades para el paginador
  Math = Math;
  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Input() itemsPerPage = 10;

  @Output() currentPageChange = new EventEmitter<number>();

  // metodo para abrir el modal

  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  @Input() selectedItem: any = {};
  @Input() isModalOpen: boolean = false;
  @Output() saveItem = new EventEmitter<any>();
  @Output() closeModalEvent = new EventEmitter<void>();


  // metodos para los filtros
  onFilterChange() {
    this.filterChanged.emit(this.filters);
  }

  onSearchChange() {
    this.searchChanged.emit(this.searchTerm);
  }

  clearFilters() {
    this.clearFiltersEvent.emit();

  }

  // metodos para las tablas
  editar(item: any) {
    this.selectedItem = { ...item };
    this.onEditar.emit(item);

    if (this.dialogRef?.nativeElement) {
      this.dialogRef.nativeElement.showModal();
    }
  }


  eliminar(item: any) {
    this.onEliminar.emit(item.id);
  }

  save(item: any) {
    this.onsave.emit(item);
  }

  isSpecialCase(col: string): boolean {
  return ['isactive', 'espostulable'].includes(col);
}

  // metodo para el paginador
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get visiblePages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const range: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) range.push(i);
    } else {
      if (current <= 4) {
        range.push(1, 2, 3, 4, 5, -1, total);
      } else if (current >= total - 3) {
        range.push(1, -1);
        for (let i = total - 4; i <= total; i++) range.push(i);
      } else {
        range.push(1, -1, current - 1, current, current + 1, -1, total);
      }
    }

    return range;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.currentPageChange.emit(this.currentPage);
  }

  get fromItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get toItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  //metodo para modal
  guardar() {
    this.saveItem.emit(this.selectedItem);
    this.cerrarModal();
  }

  cerrarModal() {
    this.dialogRef?.nativeElement?.close();
    this.closeModalEvent.emit();
  }


  getEditableKeys(): string[] {
    return Object.keys(this.selectedItem).filter(key => key !== 'id');
  }
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getInputType(key: string): string {
    const dateFields = ['fecha'];
    const urlFields = ['paginaWeb'];
    const emailFields = ['email']; // si tuvieses alguno
    const numberFields = ['telefono', 'valor', 'cantidad']; // ejemplo

    if (dateFields.includes(key)) return 'date';
    if (urlFields.includes(key)) return 'url';
    if (emailFields.includes(key)) return 'email';
    if (numberFields.includes(key)) return 'number';

    return 'text'; // por defecto
  }


}
