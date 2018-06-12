import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TurnoService } from './turno.service';
import { SelectItem } from 'primeng/primeng';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-punto-venta-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css'],
  providers: [TurnoService]
})
export class TurnoComponent implements OnInit {
  turnos: any[]= [];
  visible = false;
  opciones: SelectItem[]= [];
  constructor(private _router: Router, private _service: TurnoService) { }
  ngOnInit() {
     // Update the AdminLTE layouts
    this.get();
    this.opciones.push({label: 'Todo', value: null});
    this.opciones.push({label: 'Abierto', value: 'true'});
    this.opciones.push({label: 'Cerrado', value: 'false'});
  }

  get() {
    this._service.getGenerico('turno/' + localStorage.getItem('sucursalId')).subscribe( data => {
      this.turnos = data;
      console.log(this.turnos);
    });
  }

  irAbrirCaja(turno) {
    if (turno.Estatus  && turno.Estatus === true) {
      this._router.navigate(['/admin/turnos/abrir-caja', turno.Id]);
    } else {
      this._service.enviarMensaje('error', 'Error', 'Turno Esta Cerrado');
    }
  }

  reAbrir(turno) {

  }

  irVender(turno) {
    if (turno.Estatus  && turno.Estatus === true) {
      this._router.navigate(['/admin/punto-venta', turno.Id]);
    } else {
      this._service.enviarMensaje('error', 'Error', 'Turno Esta Cerrado');
    }
  }

  cerrar(turno) {

  }

  irReport(turno) {

  }
}
