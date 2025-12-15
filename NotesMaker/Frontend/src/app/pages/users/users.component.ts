import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { VerificationdialogueComponent } from '../../components/notes/verificationdialog/verificationdialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  constructor(private dialogRef: MatDialog) { }
  auth = inject(AuthService);
  userObj: Array<any> = []

  ngOnInit(): void {
    this.displayUsers();
  }

  displayUsers() {
    this.auth.getUsers().subscribe(user => {
      this.userObj = user.data;
      console.log("user obj: ", this.userObj);
    })
  }

  Delete(user: any) {
    console.log("user data: ", user);
    const dialogref = this.dialogRef.open(VerificationdialogueComponent, {
      data: {
        userData: user,
        mode: 'deleteUser'
      }
    })
    dialogref.afterClosed().subscribe(result => {
      if(result?.deleted){
        console.log("deleted user is: ", result);
        const UserId = result.dUserId;
        const index = this.userObj.findIndex(n => n._id === UserId)
        if(index !== -1){
          this.userObj = this.userObj.filter(n => n._id !== UserId)
        }
      }else{
        console.log("no id found after dialog is closed...");
      }
    })
  }
}
