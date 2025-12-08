import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  private dialogRef = inject(MatDialogRef<VerificationdialogueComponent>);

  DeleteNote() {
    console.log("NoteId: ", this.noteId);
    if (this.noteId) {
      this.noteObj.deleteNote(this.noteId).subscribe(result => {
        this.dialogRef.close({deleted: true, note: this.noteId});
      })
      
      console.log("delete funciton called successfully...")
      // window.location.reload();
      
    }else{
      console.log("Error getting note Id...");
    }
  }
}
