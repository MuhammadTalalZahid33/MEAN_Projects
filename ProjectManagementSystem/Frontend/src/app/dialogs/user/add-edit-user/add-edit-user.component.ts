import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss'
})
export class AddEditUserComponent {
  //Dialog Stuff
  private dialogRef = inject(MatDialogRef<AddEditUserComponent>);
  data = inject(MAT_DIALOG_DATA)

  //Services 
  // private projectService = inject(ProjectsService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  userRole = this.authService.userRole;

  //infile variables
  isEdit = false
  userData: any

  constructor() { }

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    role: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    if (this.data.mode == 'edit') {
      this.isEdit = true;
      this.userForm.patchValue(this.data.userData);
      console.log("user data: ", this.data.userData);
    }
  }

  get f() {
    return this.userForm.controls;
  }

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // private formatDate(date: Date | string | null): string | null {
  //   if (!date) return null;

  //   // If already formatted string
  //   if (typeof date === 'string') {
  //     return date.split('T')[0];
  //   }

  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');

  //   return `${year}-${month}-${day}`;
  // }



  submit(uData: any) {
    if (this.userForm.valid) {
      // const payload = {
      //   ...pData.value,
      //   start_date: this.formatDate(pData.value.start_date),
      //   end_date: this.formatDate(pData.value.end_date)
      // };
      if (this.isEdit) {
        console.log("project data: ", uData.value);
        // this.userService.editUser(payload, this.data.projectData.id).subscribe();
      } else {
        console.log("project data: ", uData.value);
        // this.projectService.addProject(payload).subscribe();
      }

      this.dialogRef.close(this.userForm.value);
    } else {
      alert("please fill all required fields...")
    }


  }

  cancel() {
    this.dialogRef.close();
  }

}
