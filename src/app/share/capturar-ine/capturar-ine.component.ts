import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CapturaIneService } from './capturar-ine.service';
import { Cliente } from '../../modelos/index';
import { Ine } from '../../modelos/ine.model';
declare var $: any;
@Component({
  selector: 'app-capturar-ine',
  templateUrl: './capturar-ine.component.html',
  styleUrls: ['./capturar-ine.component.css'],
  providers: [CapturaIneService]
})
export class CapturaIneComponent implements OnInit, OnChanges {
  @Input() visible;
  clientes: Cliente[] = [];
  ine: Ine;
  @Output() emitter = new EventEmitter();
  constructor(private _router: Router, private _route: ActivatedRoute, private _fb: FormBuilder, private _service: CapturaIneService) {
    this.ine = new  Ine();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.visible && this.visible === true) {
      this.ine = new Ine();
    }
  }
  guardar() {
    if (this.ine.TipoProceso === '' ) {
      this._service.enviarMensaje('warning', 'Error', 'Seleccione el tipo de proceso');
      return false;

    }
    if (this.ine.ContabilidadId === '' ) {
      this._service.enviarMensaje('warning', 'Error', 'Seleccione id de contabilidad');
      return false;

    }
    if (this.ine.ClaveEntidad === '' ) {
      this._service.enviarMensaje('warning', 'Error', 'Seleccione por favor la clave entidad');
      return false;

    }
    this.emitter.emit(this.ine);
  }

  cancelar() {
    this.emitter.emit(undefined);
  }

}
