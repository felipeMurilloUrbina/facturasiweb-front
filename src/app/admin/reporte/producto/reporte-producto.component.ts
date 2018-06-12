import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from '../reporte.service';
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-reporte-producto',
  templateUrl: './reporte-producto.component.html',
  styleUrls: ['./reporte-producto.component.css'],
  providers: [ReporteService]
})
export class ReporteProductoComponent implements OnInit {
  clientes: any[]= [];
  clienteSeleccionado: any;
  visible = false;
  constructor(private _router: Router, private _service: ReporteService) { }
  ngOnInit() {
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
