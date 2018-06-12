import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { SelectItem } from 'primeng/primeng';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-servicio-tabla',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css'],
  providers: [ServicioService]
})
export class TablaServicioComponent implements OnInit {
  sucursalId: string;
  servicios: any[]= [];
  servicioSeleccionado: any;
  @Input() equipoId;
  opciones: SelectItem[]= [];
  cargando =  true;
  constructor(private _router: Router, private _service: ServicioService) {
    this.sucursalId = localStorage.getItem('sucursal');
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
    if (!this.equipoId) {
      this._service.getGenerico('servicio/' + this.sucursalId + '/todas').subscribe(data => {
        this.servicios = data;
        this.cargando = false;
      }, error => {},
      () => {
        this._service.cerrarEsperando();
      });
    } else {
      this._service.getGenerico('servicio/' + this.equipoId + '/servicios' ).subscribe(data => {
        this.servicios = data;
        this.cargando = false;
      }, error => {},
      () => {
        this._service.cerrarEsperando();
      });
    }
  }

  irFacturar(servicio) {
    this._router.navigate(['/admin/facturas/nuevo', servicio.Id]);
  }


  irNuevoServicio() {
    this._router.navigate(['/admin/servicios/nuevo', this.equipoId]);
  }

  editar(equipo) {
    this._router.navigate(['/admin/servicios/editar', equipo.Id]);
  }

  eliminar(servicio) {
    if ((servicio.EstaFacturado) && (servicio.EstaFacturado)) {
      this._service.enviarMensaje('warning', 'Error', 'no se puede eliminar un servicio ya facturado');
      return false;
    }
    this.servicioSeleccionado = servicio;
     $('#modal-deactive-delete').modal({
        show: true,
        keyboard: false
    });
    $('.modal-backdrop').css('z-index', '-1');
  }

  eliminarServicio() {
    this.servicioSeleccionado.Activo = false;
    this._service.actualizar(this.servicioSeleccionado, '/' + this.servicioSeleccionado.Id).subscribe(data => {
      this._service.enviarMensaje('success', 'servicio', 'servicio eliminado correctamente');
      this.get();
    }, error => {
      this._service.enviarMensaje('error', 'servicio', 'Error, al eliminar servicio');
      this.get();
    });
  }

}
