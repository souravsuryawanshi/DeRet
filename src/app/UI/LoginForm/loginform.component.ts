import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { LoginStatus } from 'src/app/Services/login-status.service';

@Component({
  selector: 'app-login_form',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss'],
})
export class LoginFormComponent {
  constructor(
    private _log: LoginStatus,
    private _route: Router,
    private _http: HttpClient
  ) {}

  receivedError: string = '';
  loading: boolean = false;

  usernameValues = {
    emailValidate: new RegExp(
      "([!#-'+/-9=?A-Z^-~-]+(.[!#-'+/-9=?A-Z^-~-]+)|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'+/-9=?A-Z^-~-]+(.[!#-'+/-9=?A-Z^-~-]+)|[[\t -Z^-~]*])"
    ),

    placeholder: 'Enter Email',
    name: 'username',
    value: '',
    disable: false,
    type: 'email',
    validated: true,
    empty: false,
    isValid: function () {
      let result = true;

      if (this.value.trim().length < 1) {
        this.errorMessage = 'Email field cannot be empty!';
        result = false;
      } else if (!this.emailValidate.test(this.value)) {
        this.errorMessage = 'Email should be abc@example.domain';
        result = false;
      }

      this.validated = result;
      this.disable = !result;
      if (result) this.empty = false;
    },

    errorMessage: 'Email is required',
  };

  passwordValues = {
    placeholder: 'Enter Password',
    name: 'password',
    value: '',
    type: 'password',
    disable: false,
    empty: false,
    isValid: function () {
      let result = true;
      if (this.value.trim().length < 1) {
        this.errorMessage = 'Password cannot be empty!';
        result = false;
      }
      this.validated = result;
      this.disable = !result;
      if (result) this.empty = false;
    },

    validated: true,
    errorMessage: 'Password is required',
  };

  onSubmit() {
    if (
      this.usernameValues.value.length < 1 &&
      this.passwordValues.value.length < 1
    ) {
      this.usernameValues.empty = true;
      this.passwordValues.empty = true;
    } else if (this.usernameValues.value.length < 1) {
      this.usernameValues.empty = true;
    } else if (this.passwordValues.value.length < 1) {
      this.passwordValues.empty = true;
    } else if (this.usernameValues.validated && this.passwordValues.validated) {
      this.loading = true;
      this._http
        .post('https://reqres.in/api/login', {
          email: this.usernameValues.value,
          password: this.passwordValues.value,
        })
        .pipe(take(1))
        .subscribe(
          (response: any) => {
            this.loading = false;
            this.receivedError = '';
            this._log.onLoginSuccess(response.token);
            this._route.navigateByUrl('search');
          },
          (error) => {
            this.loading = false;
            this.receivedError = error.error.error;
          }
        );
    }
  }

  onForgot() {
    alert('Page is having loading error.');
  }
}
