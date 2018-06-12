import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SucursalService } from './sucursal.service';
declare var AdminLTE: any;
declare var $: any;

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css'],
  providers: [SucursalService]
})
export class SucursalComponent implements OnInit {
  sucursales: any[]= [];
  sucursalSeleccionada: any;
  cols: any[];
  height = '300px';
  constructor(private _router: Router, private _service: SucursalService) { }
  ngOnInit() {
    this.cols = [
      { field: 'Id', header: 'Codigo' },
      { field: 'Descripcion', header: 'Descripcion' },
      { field: 'Rfc', header: 'RFC' },
    ];
    this.get();
  }

  get() {
    this._service.activarEsperando();
    this._service.get().subscribe(data => {
      this.sucursales = data;
    }, error => {
    }, () => {
      this._service.cerrarEsperando();
    });
  }

  editar(sucursal) {
    this._router.navigate(['/admin/sucursales/editar', sucursal.Id]);
  }

  eliminar(sucursal) {
    this.sucursalSeleccionada = sucursal;
     $('#modal-deactive-delete').modal({
        show: true,
        keyboard: false
    });
    $('.modal-backdrop').css('z-index', '-1');
  }

  eliminarSuc() {
    this.sucursalSeleccionada.Activo = false;
    this._service.eliminar(this.sucursalSeleccionada).subscribe(data => {
      this._service.enviarMensaje('success', 'Sucursal', 'Sucursal eliminada correctamente');
      this.get();
    }, error => {
      this._service.enviarMensaje('error', 'Sucursal', 'Error, al eliminar Sucursal');
      this.get();
    });
  }
}
