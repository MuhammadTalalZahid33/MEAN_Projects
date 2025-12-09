import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router){}

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)])
  })

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {

  }

  toRegister(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.router.navigate(['/register'])).then(()=> {
        console.log("navigating...")
      })
  }
}
