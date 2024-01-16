import { Component, inject } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, ButtonModule, CardModule, InputTextModule, ReactiveFormsModule],
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
      this.authService.login(request)
        .then(res => {
          console.log(res);
          this.formLogin.reset();
        })
        .catch(err => console.error(err));
    }
  }

}
