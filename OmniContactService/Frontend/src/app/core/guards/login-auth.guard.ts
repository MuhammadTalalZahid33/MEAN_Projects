import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { ConnectService } from '../../services/connect.service';

export const loginAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionService = inject(SessionService);
  const connectService = inject(ConnectService);

  if(!sessionService.isSessionValid()) {
    connectService.logout();
    return false; 
  }

  return true;
};
