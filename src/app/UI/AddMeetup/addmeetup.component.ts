import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { LoginStatus } from 'src/app/Services/login-status.service';

@Component({
  selector: 'app-add_meetup',
  templateUrl: './addmeetup.component.html',
  styleUrls: ['./addmeetup.component.scss'],
})
export class AddMeetupComponent {
  receivedError: string = '';
  loading: boolean = false;

  constructor(
    private _route: Router,
    private _http: HttpClient,
    private _log: LoginStatus
  ) {}

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
    get pass() {
      return this.value;
    },
  };

  confirm = {
    placeholder: 'Confirm Password',
    name: 'confirm-password',
    value: '',
    type: 'password',
    disable: false,
    empty: false,
    outerScope: this,
    isValid: function () {
      let result = true;
      if (this.value.trim().length < 1) {
        this.errorMessage = 'Confirm Password cannot be empty!';
        result = false;
      } else if (this.value !== this.outerScope.passwordValues.value) {
        this.errorMessage = 'Passwords do not match!';
        result = false;
      }
      this.validated = result;
      this.disable = !result;
      if (result) this.empty = false;
    },

    validated: true,
    errorMessage: 'Confirm Password is required',
  };

  // address = {
  //   placeholder: 'Enter Address',
  //   name: 'address',
  //   value: '',
  //   disable: false,
  //   type: 'text',
  //   validated: true,
  //   empty: false,
  //   isValid: function () {
  //     let result = true;

  //     if (this.value.trim().length < 1) {
  //       this.errorMessage = 'Address cannot empty!';
  //       result = false;
  //     }
  //     this.validated = result;
  //     this.disable = !result;
  //     if (result) this.empty = false;
  //   },

  //   errorMessage: 'Address is required',
  // };

  phone = {
    placeholder: 'Phone Number',
    name: 'phone',
    value: '',
    type: 'text',
    disable: false,
    empty: false,
    isValid: function () {
      let result = true;
      if (this.value.trim().length < 1) {
        this.errorMessage = 'Phone Number is required!';
        result = false;
      } else if (this.value.trim().length > 10) {
        this.errorMessage = 'Phone Number is Invalid!';
        result = false;
      }
      this.validated = result;
      this.disable = !result;
      if (result) this.empty = false;
    },

    validated: true,
    errorMessage: 'Phone number is required',
  };

  // image = {
  //   placeholder: 'Image Url',
  //   name: 'image',
  //   value: '',
  //   type: 'text',
  //   disable: false,
  //   empty: false,
  //   isValid: function () {
  //     let result = true;
  //     if (this.value.trim().length < 1) {
  //       this.errorMessage = 'Url is required!';
  //       result = false;
  //     }
  //     this.validated = result;
  //     this.disable = !result;
  //     if (result) this.empty = false;
  //   },

  //   validated: true,
  //   errorMessage: 'Url is required',
  // };

  // title = {
  //   placeholder: 'Title',
  //   name: 'title',
  //   value: '',
  //   type: 'text',
  //   disable: false,
  //   empty: false,
  //   isValid: function () {
  //     let result = true;
  //     if (this.value.trim().length < 1) {
  //       this.errorMessage = 'Title is required!';
  //       result = false;
  //     }
  //     this.validated = result;
  //     this.disable = !result;
  //     if (result) this.empty = false;
  //   },

  //   validated: true,
  //   errorMessage: 'Title is required',
  // };

  onSubmit() {
    if (
      this.usernameValues.value.length < 1 &&
      this.phone.value.length < 1 &&
      this.passwordValues.value.length < 1 &&
      this.confirm.value.length < 1
    ) {
      this.usernameValues.empty = true;
      this.phone.empty = true;
      this.passwordValues.empty = true;
      this.confirm.empty = true;
    } else if (this.usernameValues.value.length < 1) {
      this.usernameValues.empty = true;
    } else if (this.phone.value.length < 1) {
      this.phone.empty = true;
    } else if (this.passwordValues.value.length < 1) {
      this.passwordValues.empty = true;
    } else if (this.confirm.value.length < 1) {
      this.confirm.empty = true;
    } else if (
      this.usernameValues.validated &&
      this.phone.validated &&
      this.passwordValues.validated &&
      this.confirm.validated
    ) {
      this.loading = true;
      // this._http
      //   .post(
      //     'https://meetup-88c8c-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json',
      //     {
      //       address: this.address.value,
      //       description: this.description.value,
      //       image: this.image.value,
      //       title: this.title.value,
      //     }
      //   )
      //   .pipe(take(1))
      //   .subscribe(
      //     (response: any) => {
      //       this.loading = false;
      //       console.log(response.token);

      //       this._route.navigateByUrl('');
      //     },
      //     (error) => {
      //       this.loading = false;
      //       this.receivedError = error.error.error;
      //     }
      //   );
    }
  }
}
