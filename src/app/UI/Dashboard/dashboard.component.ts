import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private _router: Router) {}
  navigateToLogin() {
    if (localStorage.getItem('user_login_status') === 'true')
      this._router.navigateByUrl('search');
    else this._router.navigateByUrl('login');
  }
}
