import { Component, HostListener, inject, model, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { DatePipe, NgIf, SlicePipe, TitleCasePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditProjectComponent } from '../../dialogs/project/add-edit-project/add-edit-project.component';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { ProjectDetailsComponent } from '../../dialogs/project/project-details/project-details.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SlicePipe, MatDialogModule, TitleCasePipe, NgIf],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  private projectService = inject(ProjectsService);
  Project: Array<any> = []

  constructor(private dialogRef: MatDialog) { }
  private authService = inject(AuthService);
  role = this.authService.userRole
  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAllProjects()
      .subscribe(p =>
        this.Project = p.data.projects
      )
  }

  addProject() {
    const dialogref = this.dialogRef.open(AddEditProjectComponent, {
      width: '600px',
      data: {
        mode: 'add'
      }
    })

    dialogref.afterClosed().subscribe(result => {
      if (result?.success) {
        // this.projectService.addProject(result).subscribe();
      }
    });
  }

  editProject(pData: any) {
    // console.log('project data: ', pData)
    const dialogref = this.dialogRef.open(AddEditProjectComponent, {
      width: '600px',
      data: {
        mode: 'edit',
        projectData: pData
      }
    })
    dialogref.afterClosed().subscribe(result => {
      if (result?.success) {

      }
    })
  }

  ViewDetails(pData: any) {
    console.log("project details: ", pData);
    this.dialogRef.open(ProjectDetailsComponent, {
      width: '600px',
      data: {
        projectData: pData
      }
    })
  }

  StartWork() {
      
  }

  deleteProject(pId: any){
    console.log("project id: ", pId);
    this.projectService.deleteProject(pId).subscribe(res => {
      console.log("deletion response: ", res);
    })
  }


  openMenuId: number | null = null;

  toggleMenu(id: number, event: Event) {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  @HostListener('document:click')
  closeMenu() {
    this.openMenuId = null;
  }

}
