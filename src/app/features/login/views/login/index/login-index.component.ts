import { Component, inject } from "@angular/core";
import { InputDirective } from "../../../../../shared/directives/input.directive";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { finalize } from "rxjs";
import authService from "../../../../../core/services/auth.service";
import { Router } from "@angular/router";
import loginService from "../../../services/login.service";
import { UserAuthInterface } from "../../../models/user-auth.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login-index.component.html',
  standalone: true,
  imports: [
    InputDirective,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,

  ]
})
export default class LoginIndexComponent {
  #loginService = inject(loginService);
  #authService = inject(authService);
  #router = inject(Router);

  formGroup!: FormGroup;
  message = 'Iniciar sesión';
  isProcessing = false;

  /**
   *
   */
  constructor() {
    this.#initializeComponent();
  }

  login(){
    if(this.isProcessing) return;

    this.#loginService.login$(this.formGroup.value as UserAuthInterface)
    .pipe(finalize(() => 
      {
        this.isProcessing = false;
        this.message = 'Iniciar sesión';
      }))
    .subscribe({
      next: (response) => {
        if(response.isSuccess && response.data){
          const token = response.data;
          this.#authService.storeToken(token);
          this.#router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.isProcessing = true;
    this.message = 'Verificando...';
    console.log(this.formGroup.value);

  } 

  #initializeComponent() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
}