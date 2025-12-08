import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registorForm !: FormGroup;

  firstName = new FormControl('', [Validators.required ,Validators.minLength(4)]);
  lastName = new FormControl('');
  userName = new FormControl('', [Validators.required, Validators.minLength(6)]);
  password = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]);

  onSubmit(){

  }
}
