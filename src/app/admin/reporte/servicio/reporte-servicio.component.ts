import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from '../reporte.service';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-reporte-servicio',
  templateUrl: './reporte-servicio.component.html',
  styleUrls: ['./reporte-servicio.component.css'],
  providers: [ReporteService]
})
export class ReporteServicioComponent implements OnInit {
  clientes: any[]= [];
  clienteSeleccionado: any;
  visible = false;
  constructor(private _router: Router, private _service: ReporteService) { }
  ngOnInit() {
    $('li').removeClass('active');
    $('#clientes').addClass('active');
     // Update the AdminLTE layouts
    this.get();
  }

  get() {
    this._service.get().subscribe(data => {
      this.clientes = data;
    }, error => {},
    () => {
      this._service.cerrarEsperando();
    });
  }

  regresar() {
    this.visible = false;
  }

  editar(cliente) {
    this._router.navigate(['/admin/clientes/editar', cliente.Id]);
  }

  eliminar(cliente) {
    this.clienteSeleccionado = cliente;
     $('#modal-deactive-delete').modal({
        show: true,
        keyboard: false
    });
    $('.modal-backdrop').css('z-index', '-1');
  }

  eliminarSuc() {
    this.clienteSeleccionado.Activo = false;
    this._service.actualizar(this.clienteSeleccionado, '/' + this.clienteSeleccionado.Id).subscribe(data => {
      this._service.enviarMensaje('success', 'Cliente', 'cliente eliminado correctamente');
      this.get();
    }, error => {
      this._service.enviarMensaje('error', 'Cliente', 'Error, al eliminar cliente');
      this.get();
    });
  }

}
