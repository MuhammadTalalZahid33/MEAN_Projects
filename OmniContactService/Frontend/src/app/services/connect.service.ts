import { Injectable } from '@angular/core';
import { ControlEvent } from '@angular/forms';
import { BehaviorSubject, concatAll, retry } from 'rxjs';

declare const connect: any;

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  private agent: any | null = null;
  private initialized = false;

  // Agent subject stream
  private agentSubject = new BehaviorSubject<any | null>(null);
  agent$ = this.agentSubject.asObservable();

  // Agent state subject stream 
  private agentStateSubject = new BehaviorSubject<string>('Offline');
  agentState$ = this.agentStateSubject.asObservable();

  private activeContact: any | null = null;

  private incomingCallSubject = new BehaviorSubject<any | null>(null);
  incomingCall$ = this.incomingCallSubject.asObservable();

  private onCallSubject = new BehaviorSubject<boolean>(false);
  onCall$ = this.onCallSubject.asObservable();

  initCCP(container: HTMLElement, instanceURL: string): void {
    if (this.initialized) return;
    this.initialized = true;

    connect.core.initCCP(container, {
      ccpUrl: instanceURL,
      loginPopup: true,
      loginPopupAutoClose: true,
      loginOptions: {
        autoClose: true,
        height: 600,
        width: 400,
        top: 0,
        left: 0,
        disableAuthPopupAfterLogout: true
      },
      softphone: {
        allowFramedSoftphone: true,
        disableRingtone: false
      }
    });

    connect.agent((agent: any) => {
      this.agent = agent;
      this.agentSubject.next(agent);

      const initialType = agent.getState()?.name ?? 'Offline';
      console.log('Initial agent state:', initialType);
      this.agentStateSubject.next(initialType);

      agent.onStateChange(() => {
        const currentType = agent.getState()?.name ?? 'Offline';
        console.log('Agent state changed to:', currentType);
        this.agentStateSubject.next(currentType);
      });
    });


    connect.core.getEventBus().subscribe(
      connect.EventType.TERMINATED,
      () => this.reset()
    );

    // Connect Call Functionality
    connect.contact((contact: any) => {
      console.log("new contact: ", contact);
      this.activeContact = contact;

      // if there is incoming call
      contact.onConnecting(() => {
        console.log("incoming call");
        this.incomingCallSubject.next(contact);
      })

      // if agent accepts the call
      contact.onConnected(() => {
        console.log("call accepted...");
        
        this.onCallSubject.next(true);
        this.incomingCallSubject.next(null);
      })

      // function to end the call
      contact.onEnded(() => {
        console.log("call has ended...");

        this.onCallSubject.next(false);
        this.activeContact = null;
      })
    })
  }

  acceptCall(): void {
    if (!this.activeContact) return;

    this.activeContact.accept({
      success: () => console.log('Call accepted successfully'),
      failure: (error: any) => console.error("Error occured while accepting call: ", error)
    })
  }

  rejectCall(): void {
    if (!this.activeContact) return;

    const rejected = this.activeContact.reject({
      success: () => console.log("rejected call successfully..."),
      failure: (error: any) => console.error("Error on rejecting call: ", error)
    })
    rejected.destroy({
      success: () => console.log("call ended successfully..."),
      failure: (error: any) => console.error("error ending call: ", error)
    })
  }

  endCall(): void {
    if (!this.activeContact) return;

    this.activeContact.getAgentConnection().destroy({
      success: () => console.log("call ended successfully..."),
      failure: (error: any) => console.error("error ending call: ", error)
    })
  }

  // Set agent state
  setAgentState(stateType: any): void {
    if (!this.agent) return;

    console.log("changing state in service: and agent: ", stateType, this.agent.getAgentStates());
    const state = this.agent.getAgentStates().find((s: any) => s.name === stateType);
    console.log("changing state after find: ", state);
    if (!state) {
      console.warn(`Agent state ${stateType} not found`);
      return;
    }

    this.agent.setState(state, {
      success: () => {
        console.log(`Agent state set to ${state.name}`);
        this.agentStateSubject.next(state.name);
      },
      failure: (err: any) => {
        console.error('Failed to set agent state', err);
      }
    }, { enqueueNextState: true });
  }

  logout(): void {
    try {
      connect.core.terminate();
    } catch (e) {
      console.warn('Terminate failed', e);
    }

    fetch('https://ccs123.my.connect.aws/logout', {
      credentials: 'include',
      mode: 'no-cors'
    }).finally(() => {
      this.reset();
      window.location.href = '/';
    });
  }


  // private setOfflineThenLogout(agent: any): void {
  //   const offlineState = agent.getAgentStates().find(
  //     (s: any) => s.type === connect.AgentStateType.OFFLINE
  //   );

  //   agent.setState(
  //     offlineState,
  //     {
  //       success: () => {
  //         console.log('Agent set to OFFLINE');
  //         this.agentStateSubject.next('OFFLINE'); // update state subject
  //         this.performLogout();
  //       },
  //       failure: (err: any) => {
  //         console.error('Failed to set OFFLINE', err);
  //         this.performLogout();
  //       }
  //     },
  //     { enqueueNextState: true }
  //   );
  // }

  // private performLogout(): void {
  //   fetch('https://ccs123.my.connect.aws/logout', {
  //     credentials: 'include',
  //     mode: 'no-cors'
  //   }).finally(() => {
  //     connect.core.terminate();
  //     this.reset();
  //     window.location.href = '/';
  //   });
  // }

  private reset(): void {
    this.agent = null;
    this.initialized = false;
    this.agentSubject.next(null);
    this.agentStateSubject.next('LOGGED_OUT');
  }
}
