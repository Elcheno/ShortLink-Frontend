import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderSessionComponent } from '../header-session/header-session.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, HeaderSessionComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private authService = inject(AuthService);

  public inSession: boolean;

  constructor() {
    this.inSession = false;
    effect(async () => {
      this.inSession = this.authService.session() !== null;
    })
  }

}
