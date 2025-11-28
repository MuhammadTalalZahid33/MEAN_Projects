import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetNotesService {
  private url = "http://localhost:5000/api/v1/Note";

  constructor(private http: HttpClient) { }

  getNotes(): Observable<any> {
    // fetch(`${this.url}/allNotes`).then((response => response.json)).then(data => console.log(data))
   return this.http.get(`${this.url}/allNotes`)
  }
}
