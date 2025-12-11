import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetNotesService } from '../../../core/services/get-notes.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-verificationdialogue',
  standalone: true,
  imports: [],
  templateUrl: './verificationdialog.component.html',
  styleUrl: './verificationdialog.component.scss'
})
export class VerificationdialogueComponent {
  data = inject(MAT_DIALOG_DATA);
  userDeletion = false
  ngOnInit() {
    if (this.data.mode == 'deleteUser') {
      this.userDeletion = true
    }

  }

  confirmDelete() {
    const mode = this.data.mode;
    const payload = this.data.payload;

    if (mode === 'delete') {
      this.DeleteNote(this.data.noteData._id);
    }

    // if (mode === 'delete-user') {
    //   this.deleteUser(this.data.userData._id);
    // }
  }

  noteObj = inject(GetNotesService);
  userObj = inject(AuthService);
  private dialogRef = inject(MatDialogRef<VerificationdialogueComponent>);

  DeleteNote(id: any) {
    console.log("NoteId: ", id);
    if (id) {
      this.noteObj.deleteNote(id).subscribe(result => {
        this.dialogRef.close({ deleted: true, note: id });
      })

      console.log("delete funciton called successfully...")

    } else {
      console.log("Error getting note Id...");
    }
  }
}
