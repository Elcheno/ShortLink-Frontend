import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'about',
    title: 'About',
    component: AboutComponent
  },
  {
    path: "links",
    title: "Links",
    loadComponent: () => import('./pages/link-list/link-list.component')
      .then(m => m.LinkListComponent)
  },
  {
    path: "login",
    title: "Login",
    loadComponent: () => import('./pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: "register",
    title: "Register",
    loadComponent: () => import('./pages/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: '',
    title: 'Home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    title: 'Error 404',
    component: ErrorComponent
  }
];
