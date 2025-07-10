import { computed, inject, Injectable, signal } from '@angular/core';
import {User, UserRequest} from '../../interfaces/user.interface'
import { UsersService } from '../../pages/home/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  private readonly userService = inject(UsersService)

  searchSigna = signal("")
  usersSignal = signal<User[]>([])
  newData = signal<UserRequest>({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  constructor(){
    this.loadUsers()
  }

  loadUsers(){
    this.userService.get().subscribe(userData => {
      this.usersSignal.set(userData)
    })
  }

  getUserComputed(){
    return computed(()=>this.usersSignal())
  }

  setNewSignal(signalSource: UserRequest) {
    this.newData.set(signalSource)
    console.log("este es signalsServie",this.newData());
    
  }

  getNewSignal():UserRequest{
    return this.newData()
  }

  setNewText(value:string){
    this.searchSigna.set(value)
  }
  getNewText(){
    return this.searchSigna()
  }
}
