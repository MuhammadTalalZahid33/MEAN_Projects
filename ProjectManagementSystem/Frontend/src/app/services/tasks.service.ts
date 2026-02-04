import { Injectable } from '@angular/core';
import { taskApi } from '../core/constants';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = taskApi
  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.url}/getAllTasks`)
    .pipe(
      catchError((error) => {
        console.log("error getting tasks: ", error);
        throw error;
      })
    )
  }

  addTask(payload: any): Observable<any>{
    return this.http.post<any>(`${this.url}/`, payload);
  }

  updateTask(payload: any, id: any){
    return this.http.post<any>(`${this.url}/id?=${id}`, payload);
  }

}
