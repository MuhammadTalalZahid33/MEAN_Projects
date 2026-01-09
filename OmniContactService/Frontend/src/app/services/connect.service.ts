import { Injectable } from '@angular/core';
import { ControlEvent } from '@angular/forms';
import { BehaviorSubject, combineLatest, filter, map, shareReplay, startWith, take } from 'rxjs';
import { SessionService } from './session.service';
import { UserApiService } from './user-api.service';

declare const connect: any;

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  private agent: any | null = null;
  private initialized = false;
  constructor(
    private sessionService: SessionService,
    private userService: UserApiService,
  ) { }


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

  private ccpInitializedSubject = new BehaviorSubject<boolean>(false);
  ccpInitialized$ = this.ccpInitializedSubject.asObservable();

  private mutedSubject = new BehaviorSubject<boolean>(false);
  muted$ = this.mutedSubject.asObservable();

  authenticated$ = combineLatest([
    this.ccpInitialized$,
    this.agent$
  ]).pipe(
    filter(([ccpReady, agent]) => ccpReady && !!agent),
    take(1),
    shareReplay(1)
  );

  loading$ = this.authenticated$.pipe(
    map(() => false),
    startWith(true),
    shareReplay(1)
  );


  initCCP(container: HTMLElement, instanceURL: string): void {
    if (this.initialized) return;
    this.initialized = true;

    const hasAppSession = this.sessionService.isSessionValid();
    console.log('[CCP] App session exists:', hasAppSession);

    connect.core.initCCP(container, {
      ccpUrl: instanceURL,

      loginPopup: !hasAppSession,
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

    // CCP iframe ready & authenticated
    connect.core.onInitialized(() => {
      console.log('[CCP] Initialized');

      this.ccpInitializedSubject.next(true);

      // Confirm app session AFTER successful CCP init
      if (!hasAppSession) {
        this.sessionService.createSession();
      }
    });

    // Authentication failed
    connect.core.onAuthFail(() => {
      console.warn('[CCP] Authentication failed');
      this.ccpInitializedSubject.next(false);
      this.sessionService.clearSession();
    });

    // Agent lifecycle
    connect.agent((agent: any) => {
      this.agent = agent;
      this.agentSubject.next(agent);

      const config = agent.getConfiguration();
      console.log('Agent Config:', config);
      localStorage.setItem('username', config.username);
      console.log('Agent: ', localStorage.getItem('username'));
      const payload = {
        agentARN: config.agentARN,
        userName: config.username,
        firstName: config.firstName,
        lastName: config.lastName,
        routingProfile: config.routingProfile?.name,
        permissions: config.permissions || []
      };

      // Add user only if not already registered
      if (!localStorage.getItem('userRegisteredKey')) {
        this.userService.addUser(payload).subscribe({
          next: () => {
            console.log('User added for the first time');
            localStorage.setItem('userRegisteredKey', 'true');
          },
          error: (err) => {
            console.error('Error adding user:', err);
          }
        });
      } else {
        console.log('User already registered, skipping addUser API');
      }

      const initialType = agent.getState()?.name ?? 'Offline';
      console.log('Initial agent state:', this.agent.getConfiguration());
      this.agentStateSubject.next(initialType);

      agent.onStateChange(() => {
        const currentType = agent.getState()?.name ?? 'Offline';
        console.log('Agent state changed to:', currentType);
        this.agentStateSubject.next(currentType);
      });

      agent.onMuteToggle((muted: boolean) => {
        console.log('Mute toggled, isMuted:', muted);
        this.mutedSubject.next(muted);
      });
    });

    // Contact lifecycle
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
        // Reset mute state when call connects
        this.mutedSubject.next(false);
      })

      // function to end the call
      contact.onEnded(() => {
        console.log("call has ended...");

        this.onCallSubject.next(false);
        this.activeContact = null;
        // Reset mute state when call ends
        this.mutedSubject.next(false);
      })
    })
  }

  //Functions called from components

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

  //   toggleMute(): void {
  //   if (!this.agent) {
  //     console.warn('Agent not initialized');
  //     return;
  //   }

  //   const isMuted = this.mutedSubject.value;
  //   if (isMuted) {
  //     this.agent.unmute({
  //       success: () => console.log('Unmute requested'),
  //       failure: (err: any) => console.error('Unmute failed', err)
  //     });
  //   } else {
  //     this.agent.mute({
  //       success: () => console.log('Mute requested'),
  //       failure: (err: any) => console.error('Mute failed', err)
  //     });
  //   }
  // }

  toggleMute(): void {
    if (!this.agent) {
      console.warn('Agent not initialized');
      return;
    }

    const currentMuteState = this.mutedSubject.value;

    if (currentMuteState) {
      // Unmute
      this.agent.unmute({
        success: () => {
          console.log('Unmuted successfully');
          this.mutedSubject.next(false);
        },
        failure: (err: any) => {
          console.error('Unmute failed', err);
        }
      });
    } else {
      // Mute
      this.agent.mute({
        success: () => {
          console.log('Muted successfully');
          this.mutedSubject.next(true);
        },
        failure: (err: any) => {
          console.error('Mute failed', err);
        }
      });
    }
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

  makeOutboundCall(phoneNumber: string): void {
    if (!this.agent) {
      console.warn('Agent not initialized');
      return;
    }

    // Agent must be available
    const stateName = this.agent.getState()?.name;
    if (stateName !== 'Available') {
      console.warn('Agent must be Available to place outbound calls');
      return;
    }

    const endpoint = connect.Endpoint.byPhoneNumber(phoneNumber);

    console.log('Dialing outbound:', phoneNumber);
    var queueArn = "arn:aws:connect:eu-west-2:547576598746:instance/e5becbb8-c2f7-40c8-aec4-d40f0e6ff035/queue/e33104db-9590-4de1-b604-fe91987715b4";
    this.agent.connect(
      endpoint,
      {
        queueARN: queueArn,
        success: () => {
          console.log('Outbound call successfully initiated');
        },
        failure: (err: any) => {
          console.error('Outbound call failed', err);
        }
      }
    );
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

  private reset(): void {
    this.agent = null;
    localStorage.removeItem('username');
    localStorage.removeItem('USER_DATA');
    localStorage.removeItem('userRegisteredKey');
    this.initialized = false;
    this.agentSubject.next(null);
    this.agentStateSubject.next('Offline'); 0
    this.mutedSubject.next(false);
  }
}
