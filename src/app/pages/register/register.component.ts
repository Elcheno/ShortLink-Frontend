import { Component, inject } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CheckboxModule, ButtonModule, CardModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  public formRegister: FormGroup;

  constructor() {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required]
    })
  }

  public onSubmit(): void {
    if (this.formRegister.valid) {
      const request = {
        name: this.formRegister.value.name,
        email: this.formRegister.value.email,
        password: this.formRegister.value.currentPassword
      }
      this.authService.register(request)
        .then(res => {
          console.log(res);
          this.formRegister.reset();
        })
        .catch(err => console.error(err));
    }
  }
}
