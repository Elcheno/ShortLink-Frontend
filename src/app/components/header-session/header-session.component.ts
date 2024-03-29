import { Component, Input, effect, inject, } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header-session',
  standalone: true,
  imports: [],
  templateUrl: './header-session.component.html',
  styleUrl: './header-session.component.scss'
})
export class HeaderSessionComponent {
  @Input() inSession!: boolean;

  private authService = inject(AuthService);

  public user!: any;

  constructor() {
    effect(async () => {
      this.user = this.authService.session();
    });
  }

  public onSignOut(): void {
    this.authService.logout()
      .then(() => console.log('Logout'))
      .catch(err => console.error(err));
  }
  
}
