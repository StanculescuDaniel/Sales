import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertInteractionService } from '../../services/alert-interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  inputEmail: FormControl = new FormControl("", [Validators.required, Validators.email]);
  inputPassword: FormControl = new FormControl("", [Validators.required]);

  constructor(
    private router: Router,
    private alertInteraction: AlertInteractionService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        inputEmail: this.inputEmail,
        inputPassword: this.inputPassword
      });
  }

  login() {
    const email = "admin@gmail.com";
    const password = "admin";
    this.alertInteraction.clearAlerts();
    if (this.inputEmail.value === email && this.inputPassword.value === password) {
      this.router.navigate(['/sales']);
    } else {
      this.alertInteraction.setError("Credentials not valid, please try again.");
      this.form.reset();
    }
  }

  isEmailInvalid(): boolean {
    return this.inputEmail != null && this.inputEmail.invalid && this.inputEmail.dirty;
  }

  isPasswordInvalid(): boolean {
    return this.inputPassword != null && this.inputPassword.invalid && this.inputPassword.dirty;
  }

  disableLogin(): boolean {
    return this.isEmailInvalid() || this.isPasswordInvalid() || !this.inputPassword.dirty || !this.inputEmail.dirty;
  }
}
