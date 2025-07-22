import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { LoadingService } from '../../../../shared/services/loading.service';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { CommonModule } from '@angular/common';
import { ThemaService } from '../../../../shared/services/thema.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterModule, LoadingComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export default class LoginComponent {
  private readonly authService = inject(AuthService)
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly loading = inject(LoadingService)
  public themaService = inject(ThemaService)

  loginForm: FormGroup
  registerForm: FormGroup
  loadpage = this.loading.isloading()
  isDarkMode = ''
  theme = false

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    this.themaService.theme$.subscribe((isDark) => {
      this.theme = isDark;
      this.isDarkMode = isDark ? 'Dark Mode' : 'Light Mode';
    });

  }
  loginSession() {
    if (this.loginForm?.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loading.toggleLoading()
          this.router.navigate(['/dashboard'])
        },
        error: (e) => {
          console.log('se genero un error', e);
        },
        complete: () => {
          this.loading.toggleLoading()
        }
      })
    }
  }
  registerUserSession() {
    if (this.registerForm?.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          console.log('usuario creado exitosamente', res);
          this.loading.toggleLoading()
          this.router.navigate(['/dashboard'])
        },
        error: (e) => {
          console.log('se genero un error al crear el usuario', e);

        },
        complete: () => {
          this.loading.toggleLoading()
        }
      })
    }
  }

  toggleDarkMode() {
    this.themaService.toggle();
    this.theme = this.themaService.state;
    this.isDarkMode = this.theme ? 'Dark Mode' : 'Light Mode';
  }

}
