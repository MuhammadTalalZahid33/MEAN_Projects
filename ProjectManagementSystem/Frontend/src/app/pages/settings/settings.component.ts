import { Component, inject, model, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TitleCasePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../../dialogs/user/add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [TitleCasePipe, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  private userService = inject(UserService);
  constructor(private dialogRef: MatDialog){}
  ngOnInit(): void {
    this.getData();
  }

  userObj: any
  getData() {
    const id = localStorage.getItem('userId');
    this.userService.getYourData(id).subscribe(res => {

      const response = res as { data: any[] };
      this.userObj = response.data;
      console.log("user data: ", this.userObj);
    }
    )
  }

  editProfile(){
    this.dialogRef.open(AddEditUserComponent, {
      width: '400px',
      data: {
        mode: 'edit',
        userData: this.userObj
      }
    })
  }
 }
