import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, NgClass, TitleCasePipe, DatePipe],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent {
 project: any;

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectData: any }
  ) {
    this.project = data.projectData;
    console.log('project data: ', this.project);
  }

  close(): void {
    this.dialogRef.close();
  }

}
