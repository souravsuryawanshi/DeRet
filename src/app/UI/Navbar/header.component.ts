import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatus } from 'src/app/Services/login-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() span = false;
  login_status: boolean = false;

  constructor(private _log: LoginStatus, private _router: Router) {}

  ngOnInit(): void {
    this._listener();
  }

  private _listener() {
    this._log.status.subscribe((res: any) => (this.login_status = res));
    this.login_status = this._log.getLoginStatus();
  }

  navigateLogin(item: boolean) {
    this._router.navigateByUrl('/login');
  }

  navigateDashboard() {
    this._router.navigateByUrl('');
  }

  navigateHome(item: boolean) {
    this._log.logoutClicked();
    this._router.navigateByUrl('');
  }

  navigateRegister(item: boolean) {
    this._router.navigateByUrl('register');
  }

  navigatePrediction(item: boolean) {
    this._router.navigateByUrl('search');
  }

  navigateAbout(item: boolean) {
    this._router.navigateByUrl('about');
  }

  navigateRetinopathy(item: boolean) {
    this._router.navigateByUrl('retinopathy');
  }

  navigateContact(item: boolean) {
    this._router.navigateByUrl('contact');
  }

  check() {
    this.span = !this.span;
  }
}
