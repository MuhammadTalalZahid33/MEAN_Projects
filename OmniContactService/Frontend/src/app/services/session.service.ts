import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const SESSION_KEY = 'APP_SESSION';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionSubject = new BehaviorSubject<boolean>(this.hasSession());
  session$ = this.sessionSubject.asObservable();

  createSession(): void {
    const token = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, token);
    this.sessionSubject.next(true);
  }

  clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
    this.sessionSubject.next(false);
  }

  hasSession(): boolean {
    return !!localStorage.getItem(SESSION_KEY);
  }
}
