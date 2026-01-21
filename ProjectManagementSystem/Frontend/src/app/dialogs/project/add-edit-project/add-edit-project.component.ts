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
export class AddEditProjectComponent implements OnInit{
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddEditProjectComponent>);
  data = inject(MAT_DIALOG_DATA)
  private projectService = inject(ProjectsService)
  isEdit = false

  constructor() {}

  projectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    description: new FormControl(''),
    manager_id: new FormControl(null, [Validators.required]),
    start_date: new FormControl(null),
    end_date: new FormControl(null),
    status: new FormControl('active', [Validators.required])
  });

  ngOnInit(): void {
    if(this.data.mode == 'edit'){
      this.isEdit = true;
      this.projectForm.patchValue(this.data.projectData);
    }
  }

  get f() {
    return this.projectForm.controls;
  }

  submit(pData: any) {
    if (this.projectForm.valid){
      if(this.isEdit){
        
      }else{
        console.log("project data: ",pData.value)
        this.projectService.addProject(pData.value).subscribe();
      }
      
      this.dialogRef.close(this.projectForm.value);
    } else{
      alert("please fill all required fields...")
    }
    
    
  }

  cancel() {
    this.dialogRef.close();
  }
}
