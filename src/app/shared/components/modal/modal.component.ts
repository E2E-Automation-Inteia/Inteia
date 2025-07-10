import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignalsService } from '../../services/signals.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  private readonly signalsService = inject(SignalsService)
  private readonly fs = inject(FormBuilder)

  form!: FormGroup

  constructor(){
    this.form = this.fs.group({
      name: ['', Validators.required],
      lastName:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  
  @Input() idModal!:string;
  @Input() titulo!:string;
  @Input() descripcion!:string;
  @Input() parrafoContent?:string;
  @Input() send!:()=>void;
  @Input() option!:boolean
  


  executeSend(){
    const modal = document.getElementById(this.idModal) as HTMLDialogElement;
    this.signalsService.setNewSignal(this.form.value)
    if(this.send){
      this.send()
    }
    modal.close()
  }

  closeModal(){
    const modal = document.getElementById(this.idModal) as HTMLDialogElement;
    if (modal) 
      modal.close();
  }
}
