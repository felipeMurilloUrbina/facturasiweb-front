import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from './servicio.service';
declare var AdminLTE: any;
declare var $: any;

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css'],
  providers: [ServicioService]
})
export class ServicioComponent implements OnInit {
  id = 0;
  sucursales: any[]= [];
  sucursalSeleccionada: any;
  constructor(private _router: Router, private _service: ServicioService) { }
  ngOnInit() {
    $('li').removeClass('active');
    $('#servicios').addClass('active');
    this.get();
  }

  get() {
    this._service.activarEsperando();
  }

}
