import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private authService = inject(AuthService);

  public sessionData: any;
  public name: string = '';

  constructor() {
    effect(async () => {
      this.sessionData = this.authService.session;
      this.name = this.sessionData()?.name;
    })
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.authService.setSession({name: 'John Doe'});
    // }, 3000);
  }

}
