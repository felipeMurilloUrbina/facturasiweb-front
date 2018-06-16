import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { EstructuraService } from '../estructura.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [EstructuraService, JwtHelper]
})
export class MenuComponent implements OnInit {
  user: any;
  constructor(private _service: EstructuraService, private _jwtHelper: JwtHelper) { }

  ngOnInit() {
    this.user = JSON.parse(this._jwtHelper.decodeToken(localStorage.getItem('token')).user);
  }

}
