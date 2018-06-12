import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteEquipoService } from './cliente-equipo.service';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-cliente-equipo',
  templateUrl: './cliente-equipo.component.html',
  styleUrls: ['./cliente-equipo.component.css'],
  providers: [ClienteEquipoService]
})
export class ClienteEquipoComponent implements OnInit {
  equipos: any[]= [];
  clienteSeleccionado: any;
  constructor(private _router: Router, private _service: ClienteEquipoService) { }
  ngOnInit() {
    $('li').removeClass('active');
    $('#equipos').addClass('active');
     // Update the AdminLTE layouts
    AdminLTE.init();
    this.get();
  }

  get() {
    this._service.getGenerico('equipo/cliente').subscribe(data => {
      this.equipos = data;
    }, error => {},
    () => {
      this._service.cerrarEsperando();
    });
  }


  irDetalles(equipo) {
    this._router.navigate(['/admin/cliente-equipos/ver', equipo.Id]);
  }
}
