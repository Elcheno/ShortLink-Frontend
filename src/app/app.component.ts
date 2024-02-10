import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth/auth.service';
import { HeaderSessionComponent } from './components/header-session/header-session.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LinkService } from './services/link/link.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderSessionComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ShortLink';

  private readonly authService = inject(AuthService);
  private readonly linkService = inject(LinkService);

  public inSession: boolean;

  constructor() {
    this.inSession = false;
    effect(async () => {
      this.inSession = this.authService.session() !== null;
    })
  }
  
  ngOnInit(): void {
    this.authService.loadSession();
    // setTimeout(() => {
    //   this.authService.setSession(null);
    // }, 5000);
    if (this.authService.session() !== null) {
      this.linkService.getAll(0).subscribe(
        (res: any) => {
          if (!res) return;
          this.linkService.linkList.set(res);
        }
      )
    }
  }
}
