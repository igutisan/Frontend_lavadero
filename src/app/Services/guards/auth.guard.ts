import { inject } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const requiredRole = route.data?.['role']; // Obtén el rol requerido de la ruta
    if (requiredRole && !authService.hasRole(requiredRole)) {
      // Usa createUrlTree en lugar de navigate para redirigir correctamente
      return router.createUrlTree(['/unauthorized']);
    }
    return true; // Usuario autenticado y tiene el rol requerido
  } else {
    // Usa createUrlTree para redirigir al login si no está autenticado
    return router.createUrlTree(['/login']);
  }


};
