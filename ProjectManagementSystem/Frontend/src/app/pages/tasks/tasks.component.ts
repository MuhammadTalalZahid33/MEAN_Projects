import { Component, model, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../core/models/task.model';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = []

  constructor(
    private taskService: TasksService,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res?.data?.tasks;
      // console.log("api res: ", this.tasks);
    })
  }
}
