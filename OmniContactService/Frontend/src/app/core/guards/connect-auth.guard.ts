import { CanActivateFn } from '@angular/router';

export const connectAuthGuard: CanActivateFn = (route, state) => {
  return true;
};
