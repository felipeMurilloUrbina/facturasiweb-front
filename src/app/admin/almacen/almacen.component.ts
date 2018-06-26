import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlmacenService } from './almacen.service';
import { Usuario } from '../../modelos/usuario.model';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css'],
  providers: [AlmacenService]
})
export class AlmacenComponent implements OnInit {
  almacenes: any[]= [];
  almacenSeleccionado: any;
  visible = false;
  cols: any[];
  height = '300px';
  constructor(private _router: Router, private _service: AlmacenService) { }
  ngOnInit() {
     // Update the AdminLTE layouts
    this.get();
    this.cols = [
      { field: 'Codigo', header: 'Codigo' },
      { field: 'Descripcion', header: 'Descripcion' }
    ];
  }

  get() {
    this._service.get().subscribe(data => {
      this.almacenes = data;
    }, error => {},
    () => {
    });
  }

  regresar() {
    this.visible = false;
  }

  editar(almacen) {
    this._router.navigate(['/admin/almacenes/editar', almacen.Id]);
  }

  mostrarEliminar(almacen) {
    this.almacenSeleccionado = almacen;
     $('#modal-deactive-delete').modal({
        show: true,
        keyboard: false
    });
    $('.modal-backdrop').css('z-index', '-1');
  }

  eliminar() {
    this.almacenSeleccionado.Activo = false;
    this._service.eliminar(this.almacenSeleccionado).subscribe(data => {
      this._service.enviarMensaje('success', 'Almacen', 'Almacen eliminado correctamente');
      this.get();
    }, error => {
      this._service.enviarMensaje('error', 'Almacen', 'Error, al eliminar Almacen');
      this.get();
    });
  }

}
