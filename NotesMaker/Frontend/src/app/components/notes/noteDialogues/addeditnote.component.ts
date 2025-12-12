import { Component, inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetNotesService } from '../../../core/services/get-notes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route, Router, RouterLink } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-addeditnote',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addeditnote.component.html',
  styleUrl: './addeditnote.component.scss'
})
export class AddeditnoteComponent {
  // Receiving data using MAT_DIALOG_DATA property for Editing
  data = inject(MAT_DIALOG_DATA);
  IsEdit = false

  note = {
    id: '',
    title: '',
    content: ''
  }

  constructor(public router: Router){}
  private dialogRef = inject(MatDialogRef<AddeditnoteComponent>);

  ngOnInit() {
    this.note.id = this.data.noteData?._id || null;
    this.note.title = this.data.noteData?.title || null;
    this.note.content = this.data.noteData?.content || null;
    if (this.data.mode == "edit") {
      this.IsEdit = true
    }
  }

  noteObj = inject(GetNotesService);

  onSave(form: any) {
    if (form.valid) {
      if (this.IsEdit == true) {
        console.log("the id is: ", this.note.id);
        this.noteObj.editNotes(this.note).subscribe(() => {
          this.dialogRef.close({updated: true, note: this.note});
        });
        
      } else {
        this.noteObj.saveNotes(this.note).subscribe((newNote) => {
          this.dialogRef.close({added: true, note: newNote})
        })
      }
      console.log('Form submitted:', this.note);
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}
