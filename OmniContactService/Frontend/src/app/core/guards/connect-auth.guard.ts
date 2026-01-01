// import { CanActivateFn } from '@angular/router';

// export const connectAuthGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { catchError, map, of, timeout, take } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { ConnectService}  from '../../services/connect.service';

@Injectable({ providedIn: 'root' })
export class ConnectAuthGuard implements CanActivate {
  constructor( 
    private connectService: ConnectService,
    private router: Router
  ) {}

}