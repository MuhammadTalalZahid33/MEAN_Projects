import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userApi } from '../core/constants';
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = userApi
  constructor(private http: HttpClient) { }

  getUsersByRole(role: any){
    return this.http.get(`${this.url}/byRole/${role}`)
    .pipe(
      catchError((error) => {
        console.log("error getting users... by role");
        throw error;
      })
    )
  }

  getYourData(id: any){
    return this.http.get(`${this.url}/user/${id}`)
    .pipe(
      catchError((error) => {
        console.log("error getting your data...");
        throw error;
      })
    )
  }
}
