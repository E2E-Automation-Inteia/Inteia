import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { TextShortPipe } from '../../../../shared/pipe/text-short.pipe';
import { ModalComponent } from "../../../../shared/components/modal/modal.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [TextShortPipe, ModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  providers:[]
})
export class CardComponent {
  @Input() id!:number
  @Input() name!: string;
  @Input() lastName!: string;
  @Input() email!: string;
  @Input() password!: string;
  @Output() modal = new EventEmitter<number>()
  @Output() delete = new EventEmitter<number>()

  editmodal(id:number){
    this.modal.emit(id)
  }

  deleteUser(id:number){
    this.delete.emit(id)
  }

}
