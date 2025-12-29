import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import "amazon-connect-streams";
import { ConnectService } from '../../services/connect.service';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router, private connectService: ConnectService){}
  // containerDiv = document.getElementById("container-div");
  @ViewChild('ccpContainer', { static: false })
  ccpContainer !: ElementRef<HTMLDivElement>;
  instanceURL = "https://ccs123.my.connect.aws/connect/ccp-v2";


    Login() {
    // this.connectService.initCCP(
    //   this.ccpContainer.nativeElement,
    //   this.instanceURL
    // );

    this.connectService.agent$
    .pipe(filter(agent => !!agent), take(1))
    .subscribe(agent => {
      console.log("agent logged in: ", agent.getName());
      this.router.navigate(['/main']);
    })

  }
}
