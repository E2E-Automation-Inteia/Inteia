import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { LoadingService } from '../../../../shared/services/loading.service';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterModule, LoadingComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[AuthService]
})
export default class LoginComponent {
  private readonly authService = inject(AuthService)
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly loading = inject(LoadingService)

  loginForm: FormGroup
  loadpage = this.loading.isloading()

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

  }
  loginSession() {
    if (this.loginForm?.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next:(res)=>{          
          localStorage.setItem('token',(res.token))
          this.loading.toggleLoading()
          this.router.navigate(['/home'])
        },
        error:(e)=>{
          console.log('se genero un error',e);
        },
        complete:()=>{
          this.loading.toggleLoading()
        }
      })
    }
  }

}
