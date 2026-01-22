import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { projectApi } from '../core/constants';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url = projectApi
  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<any> {
    return this.http.get(`${this.url}/allProjects`)
      .pipe(
        catchError((error) => {
          console.log('error getting projects: ', error)
          throw error;
        })
      )
  }

  addProject(projectData: any): Observable<any>{
    console.log("in service, project data:", projectData);
    return this.http.post<any>(`${this.url}/createProject`, projectData)
    .pipe(
      catchError((error) => {
        console.log("error adding project: ", error);
        throw error
      })
    )
  }

  updateProject(projectData: any, projectId: any): Observable<any> {
    console.log("in service, project data:", projectData, projectId);
    return this.http.put(`${this.url}/updateProject/${projectId}`, projectData)
    .pipe(
      catchError((error) => {
        console.log("error updating project...");
        throw error
      }) 
    )
  }
}
