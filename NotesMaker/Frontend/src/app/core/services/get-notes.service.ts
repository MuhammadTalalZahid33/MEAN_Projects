import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendURL } from '../constants';
import { addEditNote } from '../models/addEditNote.model';

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

  saveNotes(Note:addEditNote){
    console.log("note saved successfully...",Note.title);
  }
}
