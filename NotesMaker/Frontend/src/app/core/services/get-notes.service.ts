import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { backendURL } from '../constants';
import { AENote } from '../models/addEditNote.type';

@Injectable({
  providedIn: 'root'
})
export class GetNotesService {
  private url = backendURL;
  // note object for edit note api 
  note = {
    title: '',
    content: '',
  }
  searchTerm: any
  constructor(private http: HttpClient) { }

  getNotes(searchText: any): Observable<any> {
    // fetch(`${this.url}/allNotes`).then((response => response.json)).then(data => console.log(data))
    return this.http.get(`${this.url}/allNotes?searchTerm=${searchText}`)
  }

  saveNotes(Note: AENote): Observable<any> {
    return this.http.post<AENote>(`${this.url}/add`, Note)
      .pipe(catchError((err) => {
        console.log(err)
        throw (err)
      }))
  }

  editNotes(Note: any): Observable<any> {
    this.note.title = Note.title;
    this.note.content = Note.content;
    console.log("id:, title ", Note.id, this.note);

    return this.http.put(`${this.url}/update/${Note.id}`, this.note)
      .pipe(catchError((err) => {
        console.log("unable to edit note...");
        throw (err);
      }))
  }

  deleteNote(id:any): Observable<any>{
    return this.http.delete(`${this.url}/delete/${id}`)
    .pipe(catchError((err)=>{
      console.log("error deleting note...");
      throw(err);
    }))
  }
}
