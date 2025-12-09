import { Injectable } from '@angular/core';
import { authURL} from '../constants';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = authURL;
  constructor(private http : HttpClient) { }

  registerUser(registerUser: any): Observable<any>{
    return this.http.post<any>(`${this.url}/registerUser`, registerUser)
    .pipe(catchError((err) => {
      console.log("error registering user...", err);
      throw(err)
    }))
  }

  loginUser(loginUser: any): Observable<any>{
    return this.http.post<any>(`${this.url}/loginUser`, loginUser)
    .pipe(catchError((err) => {
      console.log("error signing user in...", err);
      throw(err)
    }))
  }
}
