import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ConsultaProductoService } from './consulta-producto.service';
import { Producto } from '../../modelos/index';
declare var $: any;
@Component({
  selector: 'app-consulta-producto',
  templateUrl: './consulta-producto.component.html',
  styleUrls: ['./consulta-producto.component.css'],
  providers: [ConsultaProductoService]
})
export class ConsultaProductoComponent implements OnInit, OnChanges {
  @Input() productos: Producto[] = [];
  @Input() visible;
  @Output() emitter = new EventEmitter();
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder, private _service: ConsultaProductoService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.visible && this.visible === true) {
      this.get();
    }
  }

  get() {
    if (!this.productos) {
      this.productos = [];
    }
    if (this.productos.length === 0) {
      this._service.get().subscribe(data => {
        this.productos = data;
        this._service.cerrarEsperando();
      }, Error => {
        console.log(Error);
      });
    }else {
      this._service.cerrarEsperando();
    }
  }

  cerrar() {
    this.emitter.emit(undefined);
  }

  seleccionar(data) {
    this.emitter.emit(data.data);
  }
}
