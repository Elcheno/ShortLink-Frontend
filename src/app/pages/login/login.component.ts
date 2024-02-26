import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('inputPassword') inputPassword: any;

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  public formLogin: FormGroup;

  public showPassword: boolean = false;

  constructor() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    console.log(this.formLogin)
    if (this.formLogin.valid) {
      const request = {
        email: this.formLogin.value.email,
        password: this.formLogin.value.password
      }

      this.authService.login(request).subscribe(res => {
        if (res) {
          console.log(res);
          this.formLogin.reset();
        }
      });
    }
  }

  public onShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

}
