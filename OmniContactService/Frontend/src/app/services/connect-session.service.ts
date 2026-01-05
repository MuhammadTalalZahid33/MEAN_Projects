import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ConnectSession {
  timestamp: number;
  authenticated: boolean;
  agent?: {
    name: string;
    extension: string;
    state: string;
  };
  expiresAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConnectSessionService {
  private readonly SESSION_KEY = 'amazon-connect-session';
  private readonly EXPIRY_HOURS = 12; // Amazon Connect session expires after 12 hours
  
  private sessionSubject = new BehaviorSubject<ConnectSession | null>(null);
  public session$ = this.sessionSubject.asObservable();

  constructor() {
    // Load existing session on service initialization
    const existingSession = this.getSession();
    if (existingSession) {
      this.sessionSubject.next(existingSession);
    }
  }

  hasValidSession():  {
    const sessionData = localStorage.getItem(this.SESSION_KEY);
    if (!sessionData) return false;

    try {
      const session: ConnectSession = JSON.parse(sessionData);
      const now = Date.now();
      
      // Check if session hasn't expired
      return session.timestamp && session.authenticated && (now < session.expiresAt);
    } catch (error) {
      console.error('Error parsing session data:', error);
      this.clearSession();
      return false;
    }
  }

  setSession(agentData?: any): void {
    const expiryTime = this.EXPIRY_HOURS * 60 * 60 * 1000; // 12 hours in ms
    const sessionData: ConnectSession = {
      timestamp: Date.now(),
      authenticated: true,
      agent: agentData ? {
        name: agentData.name,
        extension: agentData.extension,
        state: agentData.state
      } : undefined,
      expiresAt: Date.now() + expiryTime
    };
    
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    this.sessionSubject.next(sessionData);
  }

  updateAgentState(newState: string): void {
    const session = this.getSession();
    if (session && session.agent) {
      session.agent.state = newState;
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      this.sessionSubject.next(session);
    }
  }

  clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
    this.sessionSubject.next(null);
  }

  getSession(): ConnectSession | null {
    if (this.hasValidSession()) {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      return sessionData ? JSON.parse(sessionData) : null;
    }
    return null;
  }

  isSessionExpiringSoon(minutesThreshold: number = 30): boolean {
    const session = this.getSession();
    if (!session) return false;
    
    const now = Date.now();
    const timeUntilExpiry = session.expiresAt - now;
    const thresholdMs = minutesThreshold * 60 * 1000;
    
    return timeUntilExpiry <= thresholdMs;
  }
}
