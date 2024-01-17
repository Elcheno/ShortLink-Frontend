import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ShortLink';

  private authService = inject(AuthService);

  constructor() {}
  
  ngOnInit(): void {
    this.authService.loadSession();
    // setTimeout(() => {
    //   this.authService.setSession(null);
    // }, 5000);
  }
}
