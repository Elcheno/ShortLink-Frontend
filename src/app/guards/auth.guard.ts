import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const routeService = inject(Router);

  const sessionData = authService.session();

  if (!sessionData) {
    routeService.navigateByUrl('/login');
    return false;

  } else {
    return true;
  
  }
};
