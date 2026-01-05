import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConnectService } from './services/connect.service';
import { SessionService } from './services/session.service';
import { filter } from 'rxjs/internal/operators/filter';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
   constructor(private connectService: ConnectService, private sessionService: SessionService) {}

  ngOnInit(): void {
  //   // if (!this.sessionService.hasSession()) {
  //   //   return;
  //   // }

  //   // const container = document.getElementById('ccp-root');
  //   // if (!container) return;

  //   // this.connectService.initCCP(
  //   //   container,
  //   //   'https://ccs123.my.connect.aws/connect/ccp-v2'
  //   // );
    this.connectService.initCCP(
      document.getElementById('ccp-root')!,
      'https://ccs123.my.connect.aws/connect/ccp-v2'
    );
  }

}
