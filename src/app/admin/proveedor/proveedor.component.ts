import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorService } from './proveedor.service';
import { Usuario } from '../../modelos/usuario.model';
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers: [ProveedorService]
})
export class ProveedorComponent implements OnInit {
  proveedores: any[]= [];
  proveedorSeleccionado: any;
  usuario: Usuario;
  visible = false;
  cols: any[];
  height = '300px';
  constructor(private _router: Router, private _service: ProveedorService) { }
  ngOnInit() {
    $('li').removeClass('active');
    $('#proveedores').addClass('active');
     // Update the AdminLTE layouts
    this.get();
    this.cols = [
      { field: 'Id', header: 'Codigo' },
      { field: 'Descripcion', header: 'Descripcion' },
      { field: 'Rfc', header: 'RFC' },
      { field: 'Calle', header: 'Calle' },
      { field: 'CodigoPostal', header: 'Codigo Postal' },
    ];
  }

  get() {
    this._service.activarEsperando();
    this._service.get().subscribe(data => {
      this.proveedores = data;
      this._service.activarEsperando();
    }, error => {},
    () => {
      this._service.cerrarEsperando();
    });
  }

  regresar() {
    this.visible = false;
  }

  editar(proveedor) {
    this._router.navigate(['/admin/clientes/editar', proveedor.Id]);
  }

  eliminar(proveedor) {
    this.proveedorSeleccionado = proveedor;
     $('#modal-deactive-delete').modal({
        show: true,
        keyboard: false
    });
    $('.modal-backdrop').css('z-index', '-1');
  }

  eliminarSuc() {
    this.proveedorSeleccionado.Activo = false;
    this._service.eliminar(this.proveedorSeleccionado).subscribe(data => {
      this._service.enviarMensaje('success', 'Proveedor', 'proveedor eliminado correctamente');
      this.get();
    }, error => {
      this._service.enviarMensaje('error', 'Proveedor', 'Error, al eliminar proveedor');
      this.get();
    });
  }

}
