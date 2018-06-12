import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TurnoService } from '../turno.service';
import { Turno } from '../../../../modelos/turno.model';
import { Caja } from '../../../../modelos/caja.model';

declare var $: any;
@Component({
  selector: 'app-create-turno',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [TurnoService]
})
export class NuevoTurnoComponent implements OnInit {
  turno: Turno;
  cajas: Caja[] = [];
  constructor(private _router: Router, private _route: ActivatedRoute, private _service: TurnoService) {
    this.turno = new Turno();
  }

  ngOnInit() {
    this.getNueva();
  }

  getNueva() {
    this._service.getGenerico('turno/' + + localStorage.getItem('sucursalId') + '/nuevo').subscribe(data => {
      this.turno.Folio = data;
    });
    this._service.getGenerico('caja/' + localStorage.getItem('sucursalId')).subscribe( data => {
      this.cajas = data;
    });
  }

  guardar() {
    this.turno.SucursalId = parseInt(localStorage.getItem('sucursalId'), 0);
    this._service.guardar(this.turno, '').subscribe(data => {
      console.log(data);
    });
  }

}
