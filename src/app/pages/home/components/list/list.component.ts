import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { User } from '../../../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from '../../../../shared/services/loading.service';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { SignalsService } from '../../../../shared/services/signals.service';
import { ModalComponent } from "../../../../shared/components/modal/modal.component";
import { SearchInputPipe } from '../../pipes/search-input.pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent, HttpClientModule, LoadingComponent, ModalComponent,SearchInputPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [UsersService]
})
export class ListComponent {
  private readonly userService = inject(UsersService)
  private readonly signalsService = inject(SignalsService)
  private readonly loading = inject(LoadingService)

  idUser:number | null = null
  users: Signal<Signal<User[]>> = computed(() => this.signalsService.getUserComputed())
  newText = computed(()=>this.signalsService.getNewText())
  loadpage = this.loading.isloading()

  idModal:string = 'EditModal'
  titulo = 'Editar Usuario'
  descripcion = 'Ingresa los datos del usuario a Editar'
  send = () => this.EditUser()
  option = false

  openModal(id:number): void {
    this.idUser = id
    console.log(this.idUser);
    const modal = document.getElementById('EditModal') as HTMLDialogElement
    if(modal){
      modal.showModal()
    }
  }

  EditUser(){

    if (this.idUser === null) {
      console.error('Error: No hay usuario seleccionado para actualizar');
      return;
    }

    console.log('este es list',this.signalsService.getNewSignal());
    

    this.userService.update(this.signalsService.getNewSignal(),this.idUser).subscribe({
      next:(res)=>{
        console.log('se ha generado la acutalizaicon correctamete', res);
        this.signalsService.loadUsers()
      },
      error:(e)=>{
        console.log('se ha generado un error');
      }
    })
  }

  deleteUser(id:number):void{
    this.userService.delete(id).subscribe({
      next:(res)=>{
        console.log('se ha eliminado correctamente', res);
        this.signalsService.loadUsers()
      },
      error:(e)=>{
        console.log('se ha generado un error', e);
        
      }
    }) 
  }

}
