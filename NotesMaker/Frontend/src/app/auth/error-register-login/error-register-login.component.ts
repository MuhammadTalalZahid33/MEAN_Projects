import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-register-login',
  standalone: true,
  imports: [],
  templateUrl: './error-register-login.component.html',
  styleUrl: './error-register-login.component.scss'
})
export class ErrorRegisterLoginComponent {
  constructor(private router: Router){}
  private errorLoginDialogRef = inject(MatDialogRef<ErrorRegisterLoginComponent>);
  
    toRegister(){
      this.router.navigate(['/register'])
      this.errorLoginDialogRef.close()
    }
}
