import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstructuraService } from '../estructura.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css'],
  providers: [EstructuraService]
})
export class EncabezadoComponent implements OnInit {
  sucursalId = '';
  sucursales: any[];
  constructor(private _service: EstructuraService, private _router: Router) { }

  ngOnInit() {
    this.sucursales = JSON.parse(localStorage.getItem('sucursales'));
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
