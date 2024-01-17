import { Component, Input, OnChanges, OnInit, SimpleChanges, effect } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TabMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnChanges, OnInit {

  @Input() public inSession!: boolean;

  public routes: any[];

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

  constructor() {
    this.routes = [];
  }

  ngOnInit(): void {
    this.routes = this.inSession ? this.itemsWithoutAuth : this.itemsWithAuth;
  }

  ngOnChanges(): void {
    if (this.inSession) {
      this.routes = this.itemsWithoutAuth;
    } else {
      this.routes = this.itemsWithAuth;
    }
  }

}
