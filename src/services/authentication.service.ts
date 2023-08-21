import { BehaviorSubject } from 'rxjs';

const IS_SERVER = typeof window === 'undefined';

const token$ = new BehaviorSubject(IS_SERVER ? null : localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '{}') : null);

function saveToken(token: string) {
  localStorage.setItem('token', JSON.stringify(token));
  token$.next(token);
}

function removeToken() {
  token$.next(null);
  localStorage.removeItem('token');
}

export const authenticationService = {
  saveToken,
  removeToken,
  get token() { return token$; },
};
