import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CapturaDireccionService } from './captura-direccion.service';
import { Cliente } from '../../modelos/index';
import { Ine } from '../../modelos/ine.model';
declare var $: any;
@Component({
  selector: 'app-captura-direccion',
  templateUrl: './captura-direccion.component.html',
  styleUrls: ['./captura-direccion.component.css'],
  providers: [CapturaDireccionService]
})
export class CapturaIneComponent implements OnInit, OnChanges {
  @Input() visible;
  @Output() emitter = new EventEmitter();
  constructor(private _router: Router, private _route: ActivatedRoute, private _fb: FormBuilder, private _service: CapturaDireccionService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.visible && this.visible === true) {
    }
  }

  guardar() {
    // if (this.ine.TipoProceso === '' ) {
    //   this._service.enviarMensaje('warning', 'Error', 'Seleccione el tipo de proceso');
    //   return false;

    // }
    // if (this.ine.ContabilidadId === '' ) {
    //   this._service.enviarMensaje('warning', 'Error', 'Seleccione id de contabilidad');
    //   return false;

    // }
    // if (this.ine.ClaveEntidad === '' ) {
    //   this._service.enviarMensaje('warning', 'Error', 'Seleccione por favor la clave entidad');
    //   return false;

    // }
    // this.emitter.emit(this.ine);
  }

  cancelar() {
    this.emitter.emit(undefined);
  }

}
