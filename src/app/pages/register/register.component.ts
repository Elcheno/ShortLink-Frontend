import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private routerService = inject(Router);

  public formRegister: FormGroup;
  
  public showPassword: boolean = false;

  public loaderRegister: boolean = false;

  public errorForm: string = '';


  constructor() {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    })
  }

  public onSubmit(): void {
    if (this.formRegister.valid) {
      const request = {
        name: this.formRegister.value.name,
        email: this.formRegister.value.email,
        password: this.formRegister.value.password
      }

      this.loaderRegister = true;

      setTimeout(() => {
        this.authService.register(request).subscribe(res => {
          if (res) {
            this.formRegister.reset();
            this.loaderRegister = false;
            this.routerService.navigate(['/home']);
          }
        });
      }, 500);
    } else {
      const nameError = this.formRegister.controls['name'].valid ? false : true;
      const emailError = this.formRegister.controls['email'].valid ? false : true;
      const passwordError = this.formRegister.controls['password'].valid ? false : true;

      if (emailError && passwordError && nameError) {
        this.errorForm = 'Check your name, email and password';
        
      } else if (nameError) {
        this.errorForm = 'Check your name';

      } else if (emailError) {
        this.errorForm = 'Check your email';

      } else if (passwordError) {
        this.errorForm = 'Check your password';

      }
    }
  }

  public onShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
