import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CajaService } from './caja.service';
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-punto-venta-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css'],
  providers: [CajaService]
})
export class CajaComponent implements OnInit {
  cajas: any[];
  visible = false;
  constructor(private _router: Router, private _service: CajaService) {

   }
  ngOnInit() {
    $('li').removeClass('active');
    $('#turnos').addClass('active');
    AdminLTE.init();
    this.get();
  }

  get() {
    this._service.getGenerico('caja/' + localStorage.getItem('sucursalId')).subscribe( data => {
      this.cajas = data;
    });
  }

}
