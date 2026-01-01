import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectService } from '../../services/connect.service';

@Component({
  selector: 'app-ccp-host',
  standalone: true,
  templateUrl: './ccp-host.component.html'
})
export class CcpHostComponent{
  // @ViewChild('ccpContainer') ccpContainer!: ElementRef<HTMLDivElement>;

  // constructor(private connectService: ConnectService) {}

  // ngAfterViewInit(): void {
  //   this.connectService.initCCP(
  //     this.ccpContainer.nativeElement,
  //     'https://ccs123.my.connect.aws/connect/ccp-v2'
  //   );
  // }
}
