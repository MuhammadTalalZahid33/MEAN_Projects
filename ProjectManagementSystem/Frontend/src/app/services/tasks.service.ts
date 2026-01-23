import { Injectable } from '@angular/core';
import { taskApi } from '../core/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = taskApi
  constructor(private http: HttpClient) { }

  getAllTasks(){
    
  }

}
