// services/connect.service.ts
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

declare var connect: any;

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  private agent: any;
  private ccpInstance: any;

  // Events for cross-component communication
  agentStateChanged = new EventEmitter<string>();
  agentLoggedIn = new EventEmitter<any>();
  agentLoggedOut = new EventEmitter<void>();
  agentError = new EventEmitter<any>();
  private agentPromise: Promise<any> | null = null;

  constructor(private router: Router) { }

  /**
   * Initialize CCP (call this from login component)
   */
  initCCP(container: HTMLElement, instanceURL: string): void {
    this.ccpInstance = connect.core.initCCP(container, {
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

    // Subscribe to agent events
    connect.agent((agent: any) => {
      this.agent = agent;
      console.log("agent states are :", agent.getAgentStates());
      this.setupAgentListeners(agent);
      this.agentLoggedIn.emit(agent);

    });

    connect.core.getEventBus().subscribe(
      connect.EventType.TERMINATED,
      () => console.log('Agent logged out successfully')
    );

    // Handle global errors
    // this.agent.onError((error: any) => {
    //   console.error('Connect error:', error);
    //   this.agentError.emit(error);
    // });
  }

  getAgentSync(): any | null {
    console.log("agent is from getagentasync: ", this.agent.getName);
    return this.agent;
  }

  /**
   * Setup agent event listeners
   */
  private setupAgentListeners(agent: any): void {
    // Monitor state changes
    agent.onStateChange((agentStateChange: any) => {
      const newState = agentStateChange.newState;
      console.log('Agent state changed to:', newState);
      this.agentStateChanged.emit(newState);

      // Auto-logout detection
      if (newState === 'LOGGED_OUT' || newState.type === 'LOGOUT') {
        this.handleAutoLogout();
      }
    });
  }


  /**
   * Cleanup resources (media streams, etc.)
   */
  private cleanupResources(): void {
    // Stop media streams
    this.stopMediaStreams();

    // Clear agent reference
    this.agent = null;
    this.ccpInstance = null;
  }

  /**
   * Stop all media streams
   */
  private stopMediaStreams(): void {
    try {
      // Stop all audio elements
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        if (audio.srcObject) {
          const stream = audio.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      });

      // Stop microphone if active
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(() => {
          // No active media stream
        });

    } catch (error) {
      console.warn('Error stopping media streams:', error);
    }
  }

  /**
   * Clear Connect data from storage
   */
  private clearConnectData(): void {
    try {
      // Clear localStorage items with connect/aws/ccp in key
      const keysToRemove: string[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.toLowerCase().includes('connect') ||
          key.toLowerCase().includes('aws') ||
          key.toLowerCase().includes('ccp') ||
          key.toLowerCase().includes('amazon')
        )) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log('Removed localStorage item:', key);
      });

      // Clear sessionStorage
      sessionStorage.clear();

      // Clear Connect-related cookies
      this.clearConnectCookies();

    } catch (error) {
      console.warn('Error clearing Connect data:', error);
    }
  }

  /**
   * Clear Connect cookies
   */
  private clearConnectCookies(): void {
    const cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

      if (name.toLowerCase().includes('connect') ||
        name.toLowerCase().includes('aws') ||
        name.toLowerCase().includes('ccp')) {

        // Clear cookie by setting expiry to past date
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  }

  /**
   * Force logout - use as fallback
   */
  async forceLogout(): Promise<void> {
    try {
      console.log('Performing force logout...');

      // Destroy CCP container
      this.destroyCCPContainer();

      // Clear all data
      this.clearConnectData();
      this.cleanupResources();

      // Emit logout event
      this.agentLoggedOut.emit();

      console.log('Force logout completed');

    } catch (error) {
      console.error('Force logout error:', error);
      throw error;
    }
  }

  /**
   * Destroy CCP container DOM
   */
  private destroyCCPContainer(): void {
    try {
      // Find and clear all possible CCP containers
      const selectors = [
        '#container-div',
        '[id*="ccp"]',
        '[id*="connect"]',
        '.connect-iframe'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
          // Optionally remove the container itself
          element.remove();
        });
      });

    } catch (error) {
      console.warn('Error destroying CCP container:', error);
    }
  }

  /**
   * Handle auto logout (when session expires or auth error)
   */
  private handleAutoLogout(): void {
    console.log('Auto logout triggered');
    this.cleanupResources();
    this.clearConnectData();
    this.agentLoggedOut.emit();
    this.router.navigate(['/']);
  }

  /**
   * Get current agent state
   */
  getAgentState(): string {
    console.log("getting agent state", this.agent);
    return this.agent ? this.agent.getState()?.name || 'UNKNOWN' : 'LOGGED_OUT';
  }

  getAgent(): Promise<any> {
    if (!this.agentPromise) {
      this.agentPromise = new Promise((resolve) => {
        connect.agent((agent: any) => {
          this.agent = agent;
          resolve(agent);
        });
      });
    }
    return this.agentPromise;
  }
  /**
   * Check if agent is logged in
   */
  isLoggedIn(): boolean {
    if (!this.agent) return false;
    const state = this.getAgentState();
    return state !== 'LOGGED_OUT' && state !== 'LOGOUT';
  }

  /**
   * Check if agent is on a call
   */
  isOnCall(): boolean {
    if (!this.agent) return false;
    const connections = this.agent.getConnections();
    return connections && connections.length > 0;
  }

  /**
   * Get active call count
   */
  getActiveCallCount(): number {
    if (!this.agent) return 0;
    const connections = this.agent.getConnections();
    return connections ? connections.length : 0;
  }
}