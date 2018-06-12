import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SeleccionarTurnoService } from './turno-seleccionar.service';
import { Cliente } from '../../modelos/index';
import { Turno } from '../../modelos/turno.model';
import { TurnoCaja } from '../../modelos/turno-caja.model';
declare var $: any;
@Component({
  selector: 'app-turno-seleccionar',
  templateUrl: './turno-seleccionar.component.html',
  styleUrls: ['./turno-seleccionar.component.css'],
  providers: [SeleccionarTurnoService]
})
export class SeleccionarTurnoComponent implements OnInit {
  turnosGlobales: any[] = [];
  turnoSeleccionado: TurnoCaja;
  cajas: any[] = [];
  turnos: string[] = [];
  constructor(private _router: Router, private _route: ActivatedRoute, private _fb: FormBuilder, private _service: SeleccionarTurnoService) {
    this.turnoSeleccionado  = new  TurnoCaja();
    this._route.params
      .subscribe(params => {
        this.turnoSeleccionado.TurnoId = params['id'];
      });
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this._service.getGenerico('caja/' + localStorage.getItem('sucursalId') + '/' + this.turnoSeleccionado.TurnoId + '/disponibles').subscribe(data => {
      this.cajas = data;
      console.log(data);
    });
  }

  cambioTurno(event) {
    let turnos = this.turnosGlobales.filter(t => t.Folio === event);
    turnos.forEach(t => {
      this.cajas.push(t.Caja);
    });
  }
  guardar() {
    
  }

}
