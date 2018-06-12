import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteServicioService } from '../servicio.service';
import { SelectItem } from 'primeng/primeng';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-cliente-servicio-tabla',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css'],
  providers: [ClienteServicioService]
})
export class ClienteTablaServicioComponent implements OnInit {
  sucursalId: string;
  servicios: any[]= [];
  servicioSeleccionado: any;
  @Input() equipoId;
  opciones: SelectItem[]= []  ;
  cargando =  true;
  constructor(private _router: Router, private _service: ClienteServicioService) {
  }
  ngOnInit() {
    $('li').removeClass('active');
    $('#servicios').addClass('active');
    AdminLTE.init();
    this.get();
    this.opciones.push({label: 'Todo', value: null});
    this.opciones.push({label: 'Si', value: 'true'});
    this.opciones.push({label: 'No', value: 'false'});
  }

  get() {
    this._service.getGenerico('servicio/cliente/todas').subscribe(data => {
      this.servicios = data;
      this.cargando = false;
      this._service.cerrarEsperando();
    }, error => {
      this.cargando = false;
      this._service.cerrarEsperando();
    });
  }

  irDetalles(equipo) {
    this._router.navigate(['/admin/cliente-servicios/ver', equipo.Id]);
  }
}
