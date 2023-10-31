import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertInteractionService } from '../../services/alert-interaction.service';
import { LoginService } from '../../services/login.service';
import { Store, select } from '@ngrx/store';
import { loginActions } from 'src/app/state/login/login.actions';
import { LoginRequest } from 'src/app/interfaces/login';
import { AppState, LoginState } from 'src/app/interfaces/state';
import { isLoggedInSelector } from 'src/app/state/login/login.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  inputEmail: FormControl = new FormControl("dan@gmail.com", [Validators.required, Validators.email]);
  inputPassword: FormControl = new FormControl("123", [Validators.required]);

  isLoggedIn$: Observable<boolean> = this.store.pipe(select(isLoggedInSelector));

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private alertInteraction: AlertInteractionService,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        inputEmail: this.inputEmail,
        inputPassword: this.inputPassword
      });
  }

  login() {
    const request: LoginRequest = {
      email: this.inputEmail.value,
      password: this.inputPassword.value
    }
    this.store.dispatch(loginActions.login(request));


    

    /*const email = "admin@gmail.com";
    const password = "admin";
    this.alertInteraction.clearAlerts();
    if (this.inputEmail.value === email && this.inputPassword.value === password) {
      this.loginService.login();
      this.router.navigate(['/sales']);
    } else {
      this.alertInteraction.setError("Credentials not valid, please try again.");
      this.form.reset();
    } */
  }

  isEmailInvalid(): boolean {
    return this.inputEmail != null && this.inputEmail.invalid && this.inputEmail.dirty;
  }

  isPasswordInvalid(): boolean {
    return this.inputPassword != null && this.inputPassword.invalid && this.inputPassword.dirty;
  }

  disableLogin(): boolean {
    return this.form.invalid;
  }
}
