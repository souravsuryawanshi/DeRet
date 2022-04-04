import { LoginStatus } from 'src/app/Services/login-status.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'deret';
  constructor(private _route: Router, private _log: LoginStatus) {}
  ngOnInit() {
    if (localStorage.getItem('user_login_status') === 'true')
      this._route.navigateByUrl('search');
    else this._route.navigateByUrl('');
  }
}
