import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-edit-project',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule, MatDialogActions],
  templateUrl: './add-edit-project.component.html',
  styleUrl: './add-edit-project.component.scss'
})
export class AddEditProjectComponent implements OnInit {
  //Dialog Stuff
  private dialogRef = inject(MatDialogRef<AddEditProjectComponent>);
  data = inject(MAT_DIALOG_DATA)

  //Services 
  private projectService = inject(ProjectsService);
  private userService = inject(UserService);

  //infile variables
  isEdit = false
  managers: any = null

  constructor() { }

  projectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    description: new FormControl(''),
    manager_id: new FormControl(null, [Validators.required]),
    start_date: new FormControl<Date | null>(null),
    end_date: new FormControl<Date | null>(null),
    status: new FormControl('active', [Validators.required])
  });

  ngOnInit(): void {
    this.userService.getUsersByRole('manager')
      .subscribe(res => {
        const response = res as { data: any[] };
        this.managers = response.data
        console.log('get user by role response: ', this.managers);
      })
    if (this.data.mode == 'edit') {
      this.isEdit = true;
      // this.projectForm.patchValue(this.data.projectData);
      this.projectForm.patchValue({
        ...this.data.projectData,
        start_date: this.data.projectData.start_date
          ? new Date(this.data.projectData.start_date)
          : null,
        end_date: this.data.projectData.end_date
          ? new Date(this.data.projectData.end_date)
          : null
      });
      console.log("project data: ", this.data.projectData);
    }
  }

  get f() {
    return this.projectForm.controls;
  }

  private formatDate(date: Date | string | null): string | null {
    if (!date) return null;

    // If already formatted string
    if (typeof date === 'string') {
      return date.split('T')[0];
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }



  submit(pData: any) {
    if (this.projectForm.valid) {
      const payload = {
          ...pData.value,
          start_date: this.formatDate(pData.value.start_date),
          end_date: this.formatDate(pData.value.end_date)
        };
      if (this.isEdit) {
        console.log("project data: ", payload)
        this.projectService.updateProject(payload, this.data.projectData.id).subscribe();
      } else {
        console.log("project data: ", payload);
        this.projectService.addProject(payload).subscribe();
      }

      this.dialogRef.close(this.projectForm.value);
    } else {
      alert("please fill all required fields...")
    }


  }

  cancel() {
    this.dialogRef.close();
  }
}
