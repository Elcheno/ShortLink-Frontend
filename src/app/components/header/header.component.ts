import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, TabMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnChanges {

  public inSession: boolean = false;

  public itemsWithoutAuth: any[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: 'home'
    },
    {
      label: 'Links',
      icon: 'pi pi-fw pi-link',
      routerLink: 'links'
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-info-circle',
      routerLink: 'about'
    },
  ]

  public itemsWithAuth: any[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: 'home'
    },
    {
      label: 'Links',
      icon: 'pi pi-fw pi-link',
      routerLink: 'links'
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-info-circle',
      routerLink: 'about'
    },
    {
      label: 'Register',
      icon: 'pi pi-fw pi-user-plus',
      routerLink: 'register'
    },
    {
      label: 'Login',
      icon: 'pi pi-fw pi-sign-in',
      routerLink: 'login'
    }
  ]
  
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {}

  prueba() {
    this.inSession = !this.inSession;
    console.log(this.inSession);
  }

}
