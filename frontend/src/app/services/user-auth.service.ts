import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginCredentials, LoginResponse, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  static _authenticatedUser: User;
  static _authenticatedUserSubject: Subject<User> = new Subject<User>();
  static _authToken: string;
  static _csrfToken: string;

  constructor(public http: HttpClient) { }

  set authenticatedUser(user: User) {
    UserAuthService._authenticatedUser = user;
    UserAuthService._authenticatedUserSubject.next(user);
  }

  get authenticatedUser() {
    return UserAuthService._authenticatedUser;
  }

  get authenticatedUserSubject() {
    return UserAuthService._authenticatedUserSubject.asObservable();
  }

  get authToken():string {
    if (UserAuthService._authToken) {
      return UserAuthService._authToken;
    } else {
      return localStorage.getItem('token') ?? '';
    }
  }

  set authToken(t: string) {
    UserAuthService._authToken = t;
    localStorage.setItem('token', t);
  }

  get csrfToken():string {
    if (UserAuthService._csrfToken) {
      return UserAuthService._csrfToken;
    } else {
      return localStorage.getItem('csrfToken') ?? '';
    }
  }

  set csrfToken(t: string) {
    UserAuthService._csrfToken = t;
    localStorage.setItem('csrfToken', t);
  }

  setAuthenticatedUserSubject(user: any) {
    UserAuthService._authenticatedUser = user;
    UserAuthService._authenticatedUserSubject.next(UserAuthService._authenticatedUser);
  }

  fetchCsrfToken() {}

  /**
  * Load profile informations of loagged in user
  * @return Observer<User>
  */
  whoami(): Observable<User> {
    return this.http.get<User>('/api/whoami');
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/login', credentials);
  }

  /**
   * Call logout API to destroy user session or token
   */
  logout(): Observable<any> {
    return this.http.get<any>('/api/logout');
  }
}
