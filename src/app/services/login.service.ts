import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../interfaces/login';
import { Observable, delay } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { isLoggedInSelector } from '../state/login/login.selectors';
import { AppState } from '../interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient, private store: Store<AppState>) { 
    
  }
  authenticate(req: LoginRequest): Observable<LoginResponse> {
    if(req.email == "dan@gmail.com" && req.password == "123") {
      return this.httpClient.get<LoginResponse>("../assets/login_response.json").pipe(delay(2000));
    }
    return this.httpClient.get<LoginResponse>("../assets/login_response_error.json");
  }

  isUserAuthenticated(): Observable<boolean> {
    return this.store.pipe(select(isLoggedInSelector));
  }
}



