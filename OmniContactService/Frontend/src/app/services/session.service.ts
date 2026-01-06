import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const SESSION_KEY = 'APP_SESSION';

interface sessionData {
  token: string;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionSubject = new BehaviorSubject<boolean>(localStorage.getItem(SESSION_KEY) ? true : false);
  session$ = this.sessionSubject.asObservable();

  expiryAfter = 12 * 60 * 60 * 1000; 
  
  createSession(): void {
    const session: sessionData = {
      token: crypto.randomUUID(),
      expiresAt: Date.now() + this.expiryAfter
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    this.sessionSubject.next(true);
  }

  clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
    this.sessionSubject.next(false);
  }

  isSessionValid(): boolean {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;

    try {
      const session: sessionData = JSON.parse(raw);

      if (!session.token || !session.expiresAt) {
        this.clearSession();
        return false;
      }

      if (Date.now() > session.expiresAt) {
        this.clearSession();
        return false;
      }

      return true;
    } catch {
      this.clearSession();
      return false;
    }
  }
}
