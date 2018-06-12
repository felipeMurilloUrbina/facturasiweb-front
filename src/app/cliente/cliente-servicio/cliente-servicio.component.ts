import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteServicioService } from './servicio.service';
declare var AdminLTE: any;
declare var $: any;

@Component({
  selector: 'app-cliente-servicio',
  templateUrl: './cliente-servicio.component.html',
  styleUrls: ['./cliente-servicio.component.css'],
  providers: [ClienteServicioService]
})
export class ClienteServicioComponent implements OnInit {
  id = 0;
  sucursales: any[]= [];
  sucursalSeleccionada: any;
  constructor(private _router: Router, private _service: ClienteServicioService) { }
  ngOnInit() {
    AdminLTE.init();
    $('li').removeClass('active');
    $('#servicios').addClass('active');
    this.get();
  }

  get() {
    this._service.activarEsperando();
  }

}
