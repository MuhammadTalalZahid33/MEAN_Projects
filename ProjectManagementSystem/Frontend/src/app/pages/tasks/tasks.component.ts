import { Component, inject, model, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../core/models/task.model';
import { AuthService } from '../../services/auth.service';
import { DatePipe, SlicePipe, TitleCasePipe } from '@angular/common';
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

  addTask(){

  }

  editTask(task: Task){

  }

  viewTask(task: Task){

  }

  deleteTask(taskId: any){

  }

  openMenuId: number | null = null;
  toggleMenu(id: number, event: Event) {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }
  
}
