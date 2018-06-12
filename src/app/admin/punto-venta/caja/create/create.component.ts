import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CajaService } from '../caja.service';
import { Caja } from '../../../../modelos/caja.model';

declare var $: any;
@Component({
  selector: 'app-create-caja',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [CajaService]
})
export class NuevaCajaComponent implements OnInit {
  caja: Caja;
  constructor(private _router: Router, private _route: ActivatedRoute, private _service: CajaService) {
    this.caja = new Caja();
  }

  ngOnInit() {
  }

  guardar()  {
    if (this.caja.Descripcion === '') {
      this._service.enviarMensaje('warning', '', 'Favor de escribir una descripcion');
      return false;
    }
    this.caja.SucursalId = parseInt(localStorage.getItem('sucursalId'), 0);
    this._service.guardar(this.caja, '').subscribe(data => {
      this._service.enviarMensaje('success', '' , data);
    }, error => {
      this._service.enviarMensaje('error', '' , 'Ocurrio un error al guardar caja');
    });
  }

}
