import { Component, inject, model, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditProjectComponent } from '../../dialogs/project/add-edit-project/add-edit-project.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [DatePipe, MatDialogModule, MatIcon],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  private projectService = inject(ProjectsService);
  Project: Array<any> = []

  constructor(private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAllProjects()
      .subscribe(p =>
        this.Project = p.data.projects
      )
    console.log("the projects are: ", this.Project);
  }

  addProject() {
    const dialogref = this.dialogRef.open(AddEditProjectComponent, {
      width: '600px',
      data: {
        mode: 'add'
      }
    })

     dialogref.afterClosed().subscribe(result => {
      if (result.success) {
        // this.projectService.addProject(result).subscribe();
      }
    });
  }

  editProject(pData: any){
    // console.log('project data: ', pData)
    const dialogref = this.dialogRef.open(AddEditProjectComponent, {
      width: '600px',
      data:{
        mode: 'edit',
        projectData: pData
      }
    })
    dialogref.afterClosed().subscribe(result => {
      if(result.success){

      }
    })
  }
}
