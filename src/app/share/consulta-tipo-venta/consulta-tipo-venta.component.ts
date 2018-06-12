import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ConsultaTipoVentaService } from './consulta-tipo-venta.service';
import { TipoVenta } from '../../modelos/index';
declare var $: any;
@Component({
  selector: 'app-consulta-tipo-venta',
  templateUrl: './consulta-tipo-venta.component.html',
  styleUrls: ['./consulta-tipo-venta.component.css'],
  providers: [ConsultaTipoVentaService]
})
export class ConsultaTipoVentaComponent implements OnInit {
  @Input() visible;
  tipoVentas: TipoVenta[] = [];
  @Output() emitter = new EventEmitter();
  constructor(private _router: Router, private _route: ActivatedRoute, private _fb: FormBuilder, private _service: ConsultaTipoVentaService) {
  }

  ngOnInit() {
    this.get();
  }

  get() {
    if (this.tipoVentas.length === 0) {
      this._service.get().subscribe(data => {
        this.tipoVentas = data;
      }, Error => {
        console.log(Error);
      });
    }
  }

  seleccionar(data) {
    this.emitter.emit(data.data);
  }

  cancelar(event) {
    this.emitter.emit(undefined);
  }

}
