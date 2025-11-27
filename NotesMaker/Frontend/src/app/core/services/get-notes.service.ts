import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetNotesService {
  private url = "http://localhost:5000/api/v1/Note";

  http = inject(HttpClient)

  getNotes() : Observable<any> {
    return this.http.get(`${this.url}/allNotes`);
  }
}
