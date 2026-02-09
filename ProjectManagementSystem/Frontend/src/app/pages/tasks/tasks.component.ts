import { Component, HostListener, inject, model, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../core/models/task.model';
import { AuthService } from '../../services/auth.service';
import { DatePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { AddEditTaskComponent } from '../../dialogs/task/add-edit-task/add-edit-task.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [DatePipe, SlicePipe, TitleCasePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = []
  private authService = inject(AuthService);
  role = this.authService.userRole;
  constructor(
    private taskService: TasksService,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res?.data?.tasks;
      // console.log("api res: ", this.tasks);
    })
  }

  addTask() {
    const dialogref = this.dialogRef.open(AddEditTaskComponent, {
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

  editTask(tData: Task) {
    const dialogref = this.dialogRef.open(AddEditTaskComponent, {
      width: '600px',
      data: {
        mode: 'edit',
        taskData: tData
      }
    })
    dialogref.afterClosed().subscribe(result => {
      if (result?.success) {

      }
    })
  }

  viewTask(task: Task) {

  }

  deleteTask(taskId: any) {
    if (taskId) {
      this.taskService.deleteTask(taskId).subscribe(res => {
        console.log("del response: ", res);
      })
    }else
      console.log("Couldn't get task Id...");
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
