import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetNotesService } from '../../../core/services/get-notes.service';

@Component({
  selector: 'app-verificationdialogue',
  standalone: true,
  imports: [],
  templateUrl: './verificationdialog.component.html',
  styleUrl: './verificationdialog.component.scss'
})
export class VerificationdialogueComponent {
  data = inject(MAT_DIALOG_DATA);
  noteId = this.data.noteData._id;

  noteObj = inject(GetNotesService);

  DeleteNote() {
    console.log("NoteId: ", this.noteId);
    if (this.noteId) {
      this.noteObj.deleteNote(this.noteId).subscribe();
      console.log("delete funciton called successfully...")
    }else{
      console.log("Error getting note Id...");
    }

  }
}
