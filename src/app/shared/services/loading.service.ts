import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isloading = signal(false)

  toggleLoading(){
    this.isloading.set(!this.isloading())
  }
}
