import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { backendURL } from '../constants';
import { AENote } from '../models/addEditNote.model';

@Injectable({
  providedIn: 'root'
})
export class GetNotesService {
  private url = backendURL;

  constructor(private http: HttpClient) { }

  getNotes(): Observable<any> {
    // fetch(`${this.url}/allNotes`).then((response => response.json)).then(data => console.log(data))
    return this.http.get(`${this.url}/allNotes`)
  }

  saveNotes(Note: AENote): Observable<any> {
    return this.http.post<AENote>(`${this.url}/add`, Note)
      .pipe(catchError((err) => {
        console.log(err)
        throw (err)
      }))
  }

  editNotes(Note:AENote): Observable<any>{
    return this.http.put(`${this.url}/update/:id`, Note)
    .pipe(catchError((err) => {
      console.log("unable to edit note...");
      throw(err);
    }))
  }
}
