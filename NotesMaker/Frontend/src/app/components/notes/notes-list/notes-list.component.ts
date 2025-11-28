import { Component, inject, OnInit, signal } from '@angular/core';
import { Note } from '../../../core/models/note.type';
import { GetNotesService } from '../../../core/services/get-notes.service';
import { catchError } from 'rxjs';
import { AddeditnoteComponent } from "../addeditnote/addeditnote.component";

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [AddeditnoteComponent],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent implements OnInit {
  noteObj: Array<Note> = []
  notes = signal<Array<Note>>
  noteObject = inject(GetNotesService);

  // Hook to get the Note Array...
  ngOnInit(): void {
    this.noteObject.getNotes()
      .pipe(catchError((err) => {
        console.log("error getting note list")
        throw (err)
      }))
      .subscribe((note) => {
        this.noteObj = note.allNotes;
        // console.log(this.noteObj);
      })
  }

  openDialog(){
    // const dialogRef = this.
  }
}
