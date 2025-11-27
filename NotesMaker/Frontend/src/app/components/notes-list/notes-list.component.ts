import { Component, inject, OnInit, signal } from '@angular/core';
import { Note } from '../../core/models/note.type';
import { GetNotesService } from '../../core/services/get-notes.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent implements OnInit{
  noteObj: any[] = []
  notes = signal<Array<Note>>
  noteObject = inject(GetNotesService);

  ngOnInit() : void {
    this.noteObject.getNotes()
    .pipe(catchError((err) => {
      console.log("error getting note list")
      throw(err)
    }))
    .subscribe((note) => {
      this.noteObj = note;
      console.log(this.noteObj);
      // this.notes.set()
    })
  }
}
