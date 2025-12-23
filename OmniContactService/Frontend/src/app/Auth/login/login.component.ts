import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import "amazon-connect-streams";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router){}

  containerDiv = document.getElementById("container-div");
  @ViewChild('ccpContainer', { static: false })
  ccpContainer !: ElementRef<HTMLDivElement>;
  instanceURL = "https://ccs123.my.connect.aws/connect/ccp-v2";
  Login() {
    connect.core.initCCP(this.ccpContainer.nativeElement, {
      ccpUrl: this.instanceURL,            // REQUIRED
      loginPopup: true,               // optional, defaults to `true`
      loginPopupAutoClose: true,      // optional, defaults to `false`
      loginOptions: {                 // optional, if provided opens login in new window
        autoClose: true,              // optional, defaults to `false`
        height: 600,                  // optional, defaults to 578
        width: 400,                   // optional, defaults to 433
        top: 0,                       // optional, defaults to 0
        left: 0,                       // optional, defaults to 0
        disableAuthPopupAfterLogout: false // optional, determines if CCP should trigger the login popup after being logged out. Defaults to false.
      },
      // region: 'eu-central-1', // REQUIRED for `CHAT`, optional otherwise
      softphone: {
        // optional, defaults below apply if not provided
        allowFramedSoftphone: true, // optional, defaults to false
        disableRingtone: false, // optional, defaults to false
        ringtoneUrl: '[your-ringtone-filepath].mp3', // optional, defaults to CCP’s default ringtone if a falsy value is set
        disableEchoCancellation: false, // optional, defaults to false
        allowFramedVideoCall: true, // optional, default to false
        allowFramedScreenSharing: true, // optional, default to false
        allowFramedScreenSharingPopUp: true, // optional, default to false
        // VDIPlatform: null, // optional, provide with 'CITRIX' if using Citrix VDI, or use enum VDIPlatformType
        allowEarlyGum: true, //optional, default to true
      },
      // task: {
      //   disableRingtone: false, // optional, defaults to false
      //   ringtoneUrl: "[your-ringtone-filepath].mp3" // optional, defaults to CCP's default ringtone if a falsy value is set
      // },
      // pageOptions: { //optional
      //   enableAudioDeviceSettings: false, //optional, defaults to 'false'
      //   enableVideoDeviceSettings: false, //optional, defaults to 'false'
      //   enablePhoneTypeSettings: true, //optional, defaults to 'true' 
      //   showInactivityModal: false, // optional, determines if the inactivity modal should render in the CCP iframe. Defaults to true.
      // },
      // shouldAddNamespaceToLogs: false, //optional, defaults to 'false'
      // ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
      // ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
      // ccpLoadTimeout: 10000, //optional, defaults to 5000 (ms)
      // logConfig: { //optional logging configuration
      //   logLevel: connect.LogLevel.INFO, //optional, defaults to LogLevel.INFO
      //   echoLevel: connect.LogLevel.WARN, //optional, defaults to LogLevel.WARN
      // },
      // plugins: [plugin1, plugin2], //optional, can be a single plugin function or array of plugin functions
    });

    connect.agent((agent: any) => {
      console.log("Agent logged in:", agent.getName());
      if(agent){
        this.router.navigate(['/main']);
      }
    });

  }
}
