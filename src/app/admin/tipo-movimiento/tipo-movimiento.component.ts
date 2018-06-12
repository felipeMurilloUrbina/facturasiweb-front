import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoMovimientoService } from './tipo-movimiento.service';
import { Usuario } from '../../modelos/usuario.model';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-tipo-movimiento',
  templateUrl: './tipo-movimiento.component.html',
  styleUrls: ['./tipo-movimiento.component.css'],
  providers: [TipoMovimientoService]
})
export class TipoMovimientoComponent implements OnInit {
  lineas: any[]= [];
  lineaSeleccionado: any;
  usuario: Usuario;
  visible = false;
  cols: any[];
  height = '300px';
  constructor(private _router: Router, private _service: TipoMovimientoService) { }
  ngOnInit() {
    $('li').removeClass('active');
    $('#tipos-movimientos').addClass('active');
     // Update the AdminLTE layouts
    this.get();
    this.cols = [
      { field: 'Codigo', header: 'Codigo' },
      { field: 'Descripcion', header: 'Descripcion' }
    ];
  }

  get() {
    this._service.activarEsperando();
    this._service.get().subscribe(data => {
      this.lineas = data;
      this._service.activarEsperando();
    }, error => {},
    () => {
      this._service.cerrarEsperando();
    });
  }

  regresar() {
    this.visible = false;
  }

  editar(Linea) {
    this._router.navigate(['/admin/tipos-movimientos/editar', Linea.Id]);
  }

  mostrarEliminar(linea) {
    this.lineaSeleccionado = linea;
     $('#modal-deactive-delete').modal({
        show: true,
        keyboard: false
    });
    $('.modal-backdrop').css('z-index', '-1');
  }

  eliminar() {
    this.lineaSeleccionado.Activo = false;
    this._service.eliminar(this.lineaSeleccionado).subscribe(data => {
      this._service.enviarMensaje('success', 'Linea', 'Linea eliminada correctamente');
      this.get();
    }, error => {
      this._service.enviarMensaje('error', 'Linea', 'Error, al eliminar Linea');
      this.get();
    });
  }

}
