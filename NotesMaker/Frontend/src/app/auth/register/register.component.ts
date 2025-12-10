import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registorForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl(''),
      userName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      role: new FormControl('', [Validators.required])
    })

  get f() {
    return this.registorForm.controls;
  }

  constructor(private router: Router) { }
  auth = inject(AuthService)

  onSubmit() {
    if (this.registorForm.valid) {
      const registerData = this.registorForm.value;
      console.log(" data : ", registerData);
      this.auth.registerUser(registerData).subscribe(res => {
        if (res.success) {
          this.router.navigate(['/'])
        }
        // console.log("success message", res.success);
      })
    }
  }

}
