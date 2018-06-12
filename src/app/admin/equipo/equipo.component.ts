import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipoService } from './equipo.service';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
  providers: [EquipoService]
})
export class EquipoComponent implements OnInit {
  equipos: any[]= [];
  clienteSeleccionado: any;
  constructor(private _router: Router, private _service: EquipoService) { }
  ngOnInit() {
    $('li').removeClass('active');
    $('#equipos').addClass('active');
     // Update the AdminLTE layouts
    this.get();
  }

  get() {
    this._service.get().subscribe(data => {
      this.equipos = data;
    }, error => {},
    () => {
      this._service.cerrarEsperando();
    });
  }


  editar(equipo) {
    this._router.navigate(['/admin/equipos/editar', equipo.Id]);
  }

  servicios(equipo) {
    this._router.navigate(['/admin/equipos/editar', equipo.Id]);
  }

  eliminar(equipo) {
    this.clienteSeleccionado = equipo;
     $('#modal-deactive-delete').modal({
        show: true,
        keyboard: false
    });
    $('.modal-backdrop').css('z-index', '-1');
  }

  eliminarSuc() {
    this.clienteSeleccionado.Activo = false;
    this._service.actualizar(this.clienteSeleccionado, '/' + this.clienteSeleccionado.Id).subscribe(data => {
      this._service.enviarMensaje('success', 'Cliente', 'Equipo eliminado correctamente');
      this.get();
    }, error => {
      this._service.enviarMensaje('error', 'Cliente', 'Error, al eliminar equipo');
      this.get();
    });
  }

}
