import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [HeaderService, JwtHelper]
})
export class HeaderComponent implements OnInit {

  user: any;
  constructor(private _router: Router, private _jwtHelper: JwtHelper, public _service: HeaderService) {
    this.user = JSON.parse(this._jwtHelper.decodeToken(localStorage.getItem('token')).user);
  }

  ngOnInit() {
  }

  cerrarSession() {
    this._router.navigate(['/login']);
  }
}
