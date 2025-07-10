import { Component, inject } from '@angular/core';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../../../shared/services/loading.service';
import { Router, RouterLink } from '@angular/router';
import { SignalsService } from '../../../../shared/services/signals.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoadingComponent,CommonModule,HttpClientModule,ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers:[AuthService]
})
export default class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder)
  private readonly loading = inject(LoadingService)
  private readonly router = inject(Router)
  private readonly signalsServices = inject(SignalsService)

  registerForm: FormGroup
  loadpage = this.loading.isloading()

  constructor(){
    this.registerForm = this.fb.group({
      name:['', Validators.required],
      lastName:['', Validators.required],
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required,Validators.minLength(6)]]
    })
  }

  registerUserSession(){    
    if (this.registerForm?.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next:(res:any)=>{
          console.log('usuario creado exitosamente', res);
          localStorage.setItem('token',res.token)
          this.loading.toggleLoading()
          this.router.navigate(['/home'])
        },
        error:(e)=>{
          console.log('se genero un error al crear el usuario', e);
          
        },
        complete:()=>{
          this.loading.toggleLoading()
        }
      })
    }
  }

}
