import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticated: boolean = false;
  constructor() { 


  }

  login() {
    this.isAuthenticated = true;
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
