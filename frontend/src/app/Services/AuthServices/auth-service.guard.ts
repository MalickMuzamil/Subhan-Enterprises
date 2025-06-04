import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authServiceGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const role = localStorage.getItem('role');

  const isValid = await authService.validateToken(); // Server-side validation

  if (!isValid) {
    router.navigate(['/login']);
    return false;
  }

  const expectedRole = route.data['role'];
  if (expectedRole && role !== expectedRole) {
    console.warn(`Unauthorized: role mismatch. Required=${expectedRole}, found=${role}`);
    router.navigate(['/']);
    return false;
  }

  return true;
};
