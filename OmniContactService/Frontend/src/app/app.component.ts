import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConnectService } from './services/connect.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
   constructor(private connectService: ConnectService) {}

  ngOnInit(): void {
    this.connectService.initCCP(
      document.getElementById('ccp-root')!,
      'https://ccs123.my.connect.aws/connect/ccp-v2'
    );
  }
}
