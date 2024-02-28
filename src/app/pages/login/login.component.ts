import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('inputPassword') inputPassword: any;

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private routerService = inject(Router);

  public formLogin: FormGroup;

  public showPassword: boolean = false;

  public loaderLogin: boolean = false;

  public errorForm: string = '';

  constructor() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    });
  }

  public onSubmit(): void {
    console.log(this.formLogin)
    if (this.formLogin.valid) {
      const request = {
        email: this.formLogin.value.email,
        password: this.formLogin.value.password
      }

      this.loaderLogin = true;
      setTimeout(() => {
        this.authService.login(request).subscribe(res => {
          if (res) {
            this.formLogin.reset();
            this.loaderLogin = false;
            this.routerService.navigate(['/home']);
          }
        });
      }, 500);
    } else {

      const emailError = this.formLogin.controls['email'].valid ? false : true;
      const passwordError = this.formLogin.controls['password'].valid ? false : true;

      if (emailError && passwordError) {
        this.errorForm = 'Check your email and password';
        
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
