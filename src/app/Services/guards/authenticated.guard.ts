import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const userRole = authService.getRole();

    if (userRole === 'Administrador') {
      return router.createUrlTree(['/menu']); 
    } else if (userRole === 'CLIENT') {
      return router.createUrlTree(['/menuClient']);
    }
  }

  return true; // Permitir acceso si no está autenticado
}
