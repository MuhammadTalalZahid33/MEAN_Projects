import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import "amazon-connect-streams";
import { ConnectService } from '../../services/connect.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  private dialogref = inject(MatDialogRef<LogoutComponent>)
  constructor(private router: Router, private connectService: ConnectService) { }


  // USING PROMISES

  // confirmLogout() {
  //   const agent = new connect.Agent();
  //   if (agent.getState().type === connect.AgentStateType.OFFLINE) {
  //     this.logout();
  //   } else {
  //     this.setAgentOffline(agent)
  //       .then(this.logout)
  //       .catch(console.error);
  //   }
  // }

  // setAgentOffline() {
  //   return new Promise((resolve, reject) => {
  //     const agent = new connect.Agent();
  //     const offlineState = agent.getAgentStates()[0]
  //     // .find(
  //     //   (state) => state.type === connect.AgentStateType.OFFLINE,
  //     // );
  //     agent.setState(offlineState, {
  //       success: () => resolve,
  //       failure: reject,
  //     }, { enqueueNextState: true });
  //   });
  // }





//   confirmLogout() {
//     connect.agent((agent) => {
//       // console.log("agent is:", agent.getName());
//       // if (agent.getState().type === connect.AgentStateType.OFFLINE) {
//         this.logout();
//       // } else {
//       //   try{
//       //     this.setAgentOffline(agent);
//       //   }
//       //   finally{
//       //     // this.logout();
//       //     console.log("logging out...");
//       //   }
//       // }
//     })
//   }


  

//   setAgentOffline(agent: any) {
//     console.log("in the set offline");
//     const offlineState = agent.getAgentStates().find(
//       (state: any) => state.type === connect.AgentStateType.OFFLINE
//     );
//     console.log("offline state: ", offlineState);
//     agent.setState(offlineState, {
//       success: () => console.log("Agent state set to OFFLINE"),
//       failure: () => console.log("Failed to set agent state to OFFLINE"),
//     }, { enqueueNextState: true });
//   }

//   logout() {
//     const logoutEndpoint = "https://ccs123.my.connect.aws/logout";
//     fetch(logoutEndpoint, { credentials: 'include', mode: 'no-cors' })
//       .then(() => {
//         // Notify all CCPs to terminate
//         // connect.core.getUpstream().sendUpstream(connect.EventType.TERMINATE);
//         connect.core.getEventBus().trigger(connect.EventType.TERMINATE);
//         connect.core.terminate()
//         this.dialogref.close({ closed: true });
//         // Navigate back to login page
//         // this.router.navigate(['/']);
//         window.location.href = '/';
//       });
//   }

confirmLogout() {
  this.connectService.logout();
}

}

