import { Injectable, signal } from '@angular/core';
import { authURL } from '../constants';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwIfEmpty } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorRegisterLoginComponent } from '../../auth/error-register-login/error-register-login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = authURL;
  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));
  userRole = signal<string>(localStorage.getItem('role') || '');

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorLoginDialogRef: MatDialog
  ) { }


  registerUser(registerUser: any): Observable<any> {
    return this.http.post<any>(`${this.url}/registerUser`, registerUser)
      .pipe(catchError((err) => {
        console.log("error registering user...", err);
        throw (err)
      }))
  }

  loginUser(loginUser: any): Observable<any> {
    return this.http.post<any>(`${this.url}/loginUser`, loginUser)
      .pipe(
        tap(res => {
          if (res.success) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user._id);
            localStorage.setItem("role", res.data.user.role);
            // console.log("logged In user: ",res.data.user);
            // get role to decide whether to show the User tab or not...
            this.userRole.set(res.data.user.role);
            // console.log("user role:",this.userRole);
            this.isLoggedIn.set(true);
            this.router.navigate(['/allNotes'])
          }
        }),
        catchError((err) => {
          this.errorLoginDialogRef.open(ErrorRegisterLoginComponent);
          console.log("error signing user in...", err);
          throw (err)
        }))
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.url}/agents`)
      .pipe(catchError((err) => {
        console.log("error getting users...", err);
        throw (err)
      }))
  }

  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    this.isLoggedIn.set(false);
    this.userRole.set("agent");

    this.router.navigate(['/']);
  }
}
