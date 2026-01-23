import { inject, Injectable, signal, Signal } from '@angular/core';
import { authApi } from '../core/constants';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = authApi;
  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));
  userRole = signal<string>(localStorage.getItem('role') || '');

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  registerUser(userData: any): Observable<any> {
    console.log("Registering user...", userData);
    return this.http.post(`${this.url}/register`, userData)
      .pipe(
        catchError((error) => {
          console.error("Error registering user:", error);
          throw error;
        })
      );
  }

  loginUser(loginData: any): Observable<any> {
    console.log("Logging in user...", loginData);
    return this.http.post<any>(`${this.url}/login`, loginData)
      .pipe(
        tap(
          (res: any) => {
            if (res.success) {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userId", res.data.user.id);
              localStorage.setItem("role", res.data.user.role);
              console.log("logged In user: ",res.data);
              // get role to decide whether to show the User tab or not...
              this.userRole.set(res.data.user.role);
              // console.log("user role:",this.userRole);
              this.isLoggedIn.set(true);
              this.router.navigate(['/main'])
            }
          }
        ),
        catchError((error) => {
          console.error("Error logging in user:", error);
          throw error;
        })
      );
  }

  logoutUser(){
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    this.isLoggedIn.set(false);
    // this.userRole.set("agent");

    this.router.navigate(['/']);
  }
}
