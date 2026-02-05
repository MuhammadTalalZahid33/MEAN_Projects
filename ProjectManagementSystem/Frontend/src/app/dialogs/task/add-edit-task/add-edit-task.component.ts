import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TasksService } from '../../../services/tasks.service';
import { UserService } from '../../../services/user.service';
import { Project } from '../../../core/models/project.model';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-add-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.scss'
})
export class AddEditTaskComponent implements OnInit {

  private dialogRef = inject(MatDialogRef<AddEditTaskComponent>);
  data = inject(MAT_DIALOG_DATA);

  private taskService = inject(TasksService);
  private userService = inject(UserService);
  private projectService = inject(ProjectsService);

  isEdit = false;
  users: any[] = [];
  projects: Project[] = []

  taskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]),
    description: new FormControl(''),
    project_id: new FormControl(null, Validators.required), 
    assigned_to: new FormControl(null, Validators.required),
    priority: new FormControl('medium', Validators.required),
    status: new FormControl('todo', Validators.required),
    due_date: new FormControl<Date | null>(null)
  });

  ngOnInit(): void {
    this.loadProjectData();
    this.loadMemberData();
    if (this.data?.mode === 'edit') {
      this.isEdit = true;
      this.taskForm.patchValue({
        ...this.data.taskData,
        due_date: this.data.taskData.due_date
          ? new Date(this.data.taskData.due_date)
          : null
      });
    }
  }

  loadMemberData(){
     this.userService.getUsersByRole('member')
      .subscribe(res => {
        const response = res as { data: any[] };
        this.users = response.data;
      });
  }

  loadProjectData() {
    this.projectService.getAllProjects().subscribe(res => {
      this.projects = res.data.projects;
      // console.log("project res: ", this.projects)
    })
  }

  get f() {
    return this.taskForm.controls;
  }

  private formatDate(date: Date | string | null): string | null {
    if (!date) return null;

    if (typeof date === 'string') {
      return date.split('T')[0];
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const payload = {
        ...form.value,
        due_date: this.formatDate(form.value.due_date)
      };

      console.log("payload is: ", payload);
      if (this.isEdit) {
        this.taskService.updateTask(payload, this.data.taskData.id).subscribe();
      } else {
        this.taskService.addTask(payload).subscribe();
      }

      this.dialogRef.close(form.value);
    } else {
      alert('Please fill all required fields...');
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
