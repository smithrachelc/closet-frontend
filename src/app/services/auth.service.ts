import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode_ns from 'jwt-decode';
// @ts-ignore
const jwt_decode = require('jwt-decode');


export interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://closet-backend-theta.vercel.app/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userRole = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      const decoded = jwt_decode(token) as DecodedToken; // ✅

      this.userRole.next(decoded.role || '');
    }
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  signup(name: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, { name, email, password });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
    const decoded = jwt_decode(token) as DecodedToken;
    this.userRole.next(decoded.role || '');
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.userRole.next('');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  isLoggedInObservable() {
    return this.loggedIn.asObservable();
  }

  getRole(): string {
    return this.userRole.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
