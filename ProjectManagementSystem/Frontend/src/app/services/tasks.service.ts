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
    return this.http.post<any>(`${this.url}/createTask`, payload)
    .pipe(
      catchError((error) => {
        console.log("error creating task: ", error);
        throw error;
      })
    )
  }

  updateTask(payload: any, id: any){
    return this.http.put<any>(`${this.url}/updateTask/${id}`, payload)
    .pipe(
      catchError((error) => {
        console.log("error updating task: ", error);
        throw error;
      })
    )
  }

}
