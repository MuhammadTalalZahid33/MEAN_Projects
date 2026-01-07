import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ADD_USER_URL, GET_USER_URL } from '../core/constants';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) {}

  addUser(payload: any): Observable<any> {
    return this.http.post(ADD_USER_URL, payload)
    .pipe(catchError((err) => {
      console.log("error adding user:", err);
      throw err;
    }))
  }

  getUser(userName: string): Observable<any> {
    console.log('Fetching user data for:', userName);
    return this.http.get(`${GET_USER_URL}?userName=${userName}`)
    .pipe(catchError((error) => {
      console.error('Error fetching user data:', error);
      throw error;
    }))
  }
}
