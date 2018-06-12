import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { LeftSideService } from './left-side.service';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css'],
  providers: [LeftSideService, JwtHelper]
})
export class LeftSideComponent implements OnInit {
  sucursalId = '';
  sucursales: any[];
  user: any;
  constructor(private _jwtHelper: JwtHelper, private _router: Router, public _service: LeftSideService) {
    this.user = JSON.parse(this._jwtHelper.decodeToken(localStorage.getItem('token')).user);
    this.sucursales = JSON.parse(localStorage.getItem('sucursales'));
  }

  ngOnInit() {
    setTimeout(() => {
      this.sucursalId  = localStorage.getItem('sucursal').trim();
    }, 100);
  }

  onCambioEmpresa(event) {
    localStorage.setItem('sucursalId',  event);
    this._router.navigate(['/admin/dashboard']);

  }

  cerrarSession() {
    this._router.navigate(['/login']);
  }
}
