import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Note } from '../../../core/models/note.type';
import { GetNotesService } from '../../../core/services/get-notes.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AddeditnoteComponent } from "../noteDialogues/addeditnote.component";
import { MatTooltipModule, } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { VerificationdialogueComponent } from '../verificationdialog/verificationdialog.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilternotesPipe } from '../../../pipes/filternotes.pipe';
import { HighlighttextDirective } from "../../../directives/highlighttext.directive";
import { HighlightPipe } from '../../../pipes/highlight.pipe';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, FormsModule, HighlightPipe, MatPaginatorModule, ReactiveFormsModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent implements OnInit {
  noteObj: Array<Note> = []
  //Service for Apis
  noteObject = inject(GetNotesService);
  // Search Term for Notes...
  // searchTerm = signal('');
  searchTerm = new FormControl()
  // noteObj length for pagination
  nlength = 0

  constructor(private dialogRef: MatDialog) { }

  // Hook to get the Note Array...
  ngOnInit(): void {
    this.initializeSearch();
    this.loadNotes('');

  }
  private loadNotes(search: string) {
    this.noteObject.getNotes(search).subscribe(res => {
      this.noteObj = res.allNotes;
      this.nlength = this.noteObj.length;
    });
  }
  initializeSearch() {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        // switchMap(searchText => this.noteObject.getNotes(searchText))
        switchMap(term => this.noteObject.getNotes(term || ''))
      )
      .subscribe((note) => {
        this.noteObj = note.allNotes;
        this.setLength(this.noteObj.length)
      })
  }


  // UpdateResult(searchText: string) {
  //   this.searchTerm.set(searchText);
  //   // console.log("search term: ", this.searchTerm());
  //   this.noteObject.getNotes(this.searchTerm())
  //     .pipe(catchError((err) => {
  //       console.log("error gettng note list");
  //       throw(err);
  //     }) , debounceTime(500))
  //     .subscribe((note) => {
  //       this.noteObj = note.allNotes;
  //       this.setLength(this.noteObj.length)
  //     })
  // }

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

  DeleteNote(note: any) {
    // console.log("note obj", note);
    this.dialogRef.open(VerificationdialogueComponent, {
      data: {
        noteData: note,
        mode: 'delete'
      }
    })
  }

  getTooltipData(note: any) {
    // console.log("note is:", note);
    return `Id: ${note._id}
            Title: ${note.title} 
            cotent: ${note.content}
            Created At: ${note.createdAt}
            Updated At: ${note.updatedAt}`;
  }

  // MAT PAGINATOR PROPS
  setLength(noteslength: number) {
    this.nlength = noteslength
    // console.log('length of note is: ', this.nlength)
  }
  pageSize = 6;
  pageSizeOptions = [6, 12, 18, 24]
  currentPage = 1

  handlePageEvent(pageEvent: PageEvent) {

  }
}
