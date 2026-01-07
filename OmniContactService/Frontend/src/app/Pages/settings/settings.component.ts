import { Component } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { catchError } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  constructor(
    private userApiService: UserApiService,
  ){}

  userName: any;
  userData: any;

  ngOnInit() {
    this.userName = localStorage.getItem('username');
    this.userApiService.getUser(this.userName)
    .subscribe((response: any) => {
      console.log('User data fetched successfully:', response);
      this.userData = response.data;
    });
  }
}