import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form!: FormGroup;
  inputEmail: FormControl = new FormControl("", [Validators.required, Validators.email]);
  inputPassword: FormControl = new FormControl("", [Validators.required]);

  
  ngOnInit(): void {
    this.form = new FormGroup(
      { 
        inputEmail: this.inputEmail,
        inputPassword: this.inputPassword
      });
  }


  login() {
    alert(this.inputPassword.value + this.inputEmail.value);
  }

  isEmailInvalid(): boolean {
    return this.inputEmail != null && this.inputEmail.invalid && this.inputEmail.dirty;
  }

  isPasswordInvalid(): boolean {
    return this.inputPassword != null && this.inputPassword.invalid && this.inputPassword.dirty;
  }

  isFormInvalid(): boolean {
    return this.isEmailInvalid() || this.isPasswordInvalid() || !this.inputPassword.dirty || !this.inputEmail.dirty;
  }

}
