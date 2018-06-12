import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuntoVentaService } from './punto-venta.service';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.css'],
  providers: [PuntoVentaService]
})
export class VentasDelDiaComponent implements OnInit {
  clientes: any[]= [];
  clienteSeleccionado: any;
  visible = false;
  codigoBarras = '';
  constructor(private _router: Router, private _service: PuntoVentaService) { }
  ngOnInit() {
    $('li').removeClass('active');
    $('#clientes').addClass('active');
     // Update the AdminLTE layouts
    AdminLTE.init();
  }

}
