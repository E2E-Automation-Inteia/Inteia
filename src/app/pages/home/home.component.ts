import { Component, inject } from '@angular/core';
import { SearchComponent } from "./components/search/search.component";
import { LucideAngularModule, Plus, LogOut } from 'lucide-angular';
import { ListComponent } from "./components/list/list.component";
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { UsersService } from './services/users.service';
import { SignalsService } from '../../shared/services/signals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, LucideAngularModule, ListComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {

  private readonly userService = inject(UsersService)
  private readonly signalsService = inject(SignalsService) 
  private readonly router = inject(Router)

  readonly plus = Plus
  readonly logOut = LogOut

  idModal:string = 'HomeModal'
  titulo = 'Agregar Usuario'
  descripcion = 'Ingresa los datos del usuario a registrar'
  send = () => this.registerUser()
  option = false

  registerUser() {
    const data = this.signalsService.getNewSignal();
  
    const isValid = Object.values(data).every(value => value.trim() !== '');
  
    if (!isValid) {
      console.log('No hay datos válidos para enviar');
      return;
    }
  
    this.userService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        console.log('Usuario registrado');
        this.signalsService.loadUsers();
      },
      error: (e) => {
        console.log('Se ha generado un error', e);
      }
    });
  }

  logOutSession(){
    localStorage.removeItem('token')
    this.router.navigate(['/auth/login'])
  }
}
