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

  confirmDelete() {
    const mode = this.data.mode;

    if (mode === 'delete') {
      this.DeleteNote(this.data.noteData._id);
    }

    if (mode === 'deleteUser') {
      this.DeleteUser(this.data.userData._id);
    }
  }

  noteObj = inject(GetNotesService);
  userObj = inject(AuthService);
  private dialogRef = inject(MatDialogRef<VerificationdialogueComponent>);

  DeleteNote(noteId: any) {
    if (noteId) {
      this.noteObj.deleteNote(noteId).subscribe(() => {
        // console.log("deleted Note: ", deletedNote);
        this.dialogRef.close({ deleted: true, dNoteId: noteId});
      })
      console.log("delete funciton called successfully...");
    } else {
      console.log("Error getting note Id...");
    }
  }

  DeleteUser(userId: any){
    if(userId){
      this.userObj.deleteUser(userId).subscribe(deletedUser => {
        // console.log("deleted User is: ", deletedUser);
        this.dialogRef.close({deleted: true, user: deletedUser});
      })
      console.log("deleted note successfully...");
    }else{
      console.log("error getting user Id...");
    }
  }
}
