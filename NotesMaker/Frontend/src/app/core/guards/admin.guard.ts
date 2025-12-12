import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivateFn, Router } from '@angular/router';

export const AdminGuard: CanActivateFn = () => {
  const router = inject(Router);
//   const token = localStorage.getItem("token");
  const role = localStorage.getItem('role');

  if (role === 'admin') {
    return true;
  }
  router.navigate(['/nothing'])
  return false;
};
