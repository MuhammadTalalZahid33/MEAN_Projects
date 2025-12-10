import { Injectable, signal } from '@angular/core';
import { authURL } from '../constants';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = authURL;
  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient, private router: Router) {
  }
  

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
            localStorage.setItem("userId", res.data.user._id)
            // console.log("logged In user",res.data.user._id);
            this.isLoggedIn.set(true);  
            this.router.navigate(['/allNotes'])
          }
        }),
        catchError((err) => {
          console.log("error signing user in...", err);
          throw (err)
        }))
  }

  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    this.isLoggedIn.set(false);  

    this.router.navigate(['/']);
  }
}
