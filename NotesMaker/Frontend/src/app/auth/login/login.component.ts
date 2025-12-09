import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

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

  auth = inject(AuthService)

  onSubmit() {
    if(this.loginForm.valid){
      const loginData = this.loginForm.value
      this.auth.loginUser(loginData).subscribe(res => {
        if(res.success){
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.user._id)
          console.log("loginned user",res.data.user._id);
          this.router.navigate(['/allNotes'])
        }
      })
    }
  }

  toRegister(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.router.navigate(['/register'])).then(()=> {
        console.log("navigating...")
      })
  }
}
