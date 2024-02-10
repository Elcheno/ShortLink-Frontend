import { Component, inject } from '@angular/core';
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

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  public formLogin: FormGroup;

  constructor() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required]
    })
  }

  public onSubmit(): void {
    if (this.formLogin.valid) {
      const request = {
        email: this.formLogin.value.email,
        password: this.formLogin.value.currentPassword
      }

      this.authService.login(request).subscribe(res => {
        if (res) {
          console.log(res);
          this.formLogin.reset();
        }
      });
    }
  }

}
