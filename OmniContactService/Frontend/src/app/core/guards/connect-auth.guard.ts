import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

export const connectAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionService = inject(SessionService)

  // const token = localStorage.getItem("token")

  const IsExisting = sessionService.hasSession();

  if (IsExisting) {
    router.navigate(['/main']);
    return false; 
  }

  return true;
};
