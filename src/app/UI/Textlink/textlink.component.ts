import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatus } from 'src/app/Services/login-status.service';

@Component({
  selector: 'app-textlink',
  templateUrl: './textlink.component.html',
  styleUrls: ['./textlink.component.scss'],
})
export class TextLinkComponent {
  login_status: boolean = false;
  show: boolean = true;

  onClickHandler() {
    if (this._router.url === '/register') {
      this._router.navigateByUrl('login');
      return;
    }
    this._router.navigateByUrl('register');
    this.show = false;
  }

  constructor(private _log: LoginStatus, private _router: Router) {}

  ngOnInit(): void {
    this._listener();
  }

  private _listener() {
    this._log.status.subscribe((res: any) => (this.login_status = res));
  }
}
