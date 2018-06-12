import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ConsultaClienteService } from './consulta-cliente.service';
import { Cliente } from '../../modelos/index';
declare var $: any;
@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css'],
  providers: [ConsultaClienteService]
})
export class ConsultaClienteComponent implements OnInit, OnChanges {
  @Input() visible;
  clientes: Cliente[] = [];
  @Output() emitter = new EventEmitter();
  constructor(private _router: Router, private _route: ActivatedRoute, private _fb: FormBuilder, private _service: ConsultaClienteService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.visible && this.visible === true) {
      this.get();
    } else {
      this._service.cerrarEsperando();
    }
  }

  get() {
    if (this.clientes.length === 0) {
      this._service.get().subscribe(data => {
        this.clientes = data;
        this._service.cerrarEsperando();
      }, Error => {
      });
    } else {
      this._service.cerrarEsperando();
    }
  }

  seleccionar(data) {
    this.emitter.emit(data.data);
  }

  cerrar() {
    this.emitter.emit(undefined);
  }
}
