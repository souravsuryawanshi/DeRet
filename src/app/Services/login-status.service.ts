import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoginStatus {
  // status = new Subject<boolean>();

  // isUserLogin = false;

  // onLoginSuccess(item: any) {
  //   if (item) {
  //     this.status.next(true);
  //     this.isUserLogin = true;
  //   }
  // }

  // logoutClicked() {
  //   this.status.next(false);
  //   this.isUserLogin = false;
  // }

  // getLoginStatus() {
  //   return this.isUserLogin;
  // }

  status = new Subject<boolean>();

  onLoginSuccess(item: any) {
    if (item) {
      this.status.next(true);
      localStorage.setItem('user_login_status', 'true');
    }
  }

  logoutClicked() {
    this.status.next(false);
    localStorage.setItem('user_login_status', 'false');
  }

  getLoginStatus() {
    return localStorage.getItem('user_login_status') === 'true' ? true : false;
  }
}
