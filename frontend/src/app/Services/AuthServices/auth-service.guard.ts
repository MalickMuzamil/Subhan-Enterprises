import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authServiceGuard: CanActivateFn = (route, state) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const auth_token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');

    const router = inject(Router);
    const authService = inject(AuthService);

    if (!auth_token || !role) {
      router.navigate(['/auth']);
      return false;
    }

    return true;
  }

  return false;
};
