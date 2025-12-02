import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Note } from '../../../core/models/note.type';
import { GetNotesService } from '../../../core/services/get-notes.service';
import { catchError } from 'rxjs';
import { AddeditnoteComponent } from "../noteDialogues/addeditnote.component";
import {MatTooltipModule, } from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { VerificationdialogueComponent } from '../verificationdialog/verificationdialog.component';
import { FormsModule } from '@angular/forms';
import { FilternotesPipe } from '../../../pipes/filternotes.pipe';
import { HighlighttextDirective } from "../../../directives/highlighttext.directive";

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, FormsModule, FilternotesPipe, HighlighttextDirective],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent implements OnInit {
  noteObj: Array<Note> = []
  notes = signal<Array<Note>>
  //Service for Apis
  noteObject = inject(GetNotesService);
  // Search Term for Notes...
  searchTerm = signal('');

  constructor(private dialogRef: MatDialog) { }

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

  openDialog() {
    this.dialogRef.open(AddeditnoteComponent, {
      data: {
        mode: 'add'
      }
    })
  }

  EditNote(note: any) {
    // console.log("note obj", note);
    this.dialogRef.open(AddeditnoteComponent, {
      data: {
        noteData: note,
        mode: 'edit'
      }
    })
  }

  DeleteNote(note: any){
    // console.log("note obj", note);
    this.dialogRef.open(VerificationdialogueComponent,{
      data:{
        noteData: note,
        mode: 'delete'
      }
    })
  }

  getTooltipData(note: any){
    // console.log("note is:", note);
    return `Id: ${note._id}
            Title: ${note.title} 
            cotent: ${note.content}
            Created At: ${note.createdAt}
            Updated At: ${note.updatedAt}`;
  }
}
