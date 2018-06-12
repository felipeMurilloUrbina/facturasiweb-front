import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ConsultaClienteService } from './modificacion-producto.service';
import { Cliente } from '../../modelos/index';
declare var $: any;
@Component({
  selector: 'app-modificacion-producto',
  templateUrl: './modificacion-producto.component.html',
  styleUrls: ['./modificacion-producto.component.css'],
  providers: [ConsultaClienteService]
})
export class ModificacionProductoComponent implements OnInit, OnChanges {
  @Input() visible;
  @Input() producto;
  @Output() emitter = new EventEmitter();
  filtroResultados: string[] = [];
  constructor(private _router: Router, private _route: ActivatedRoute, private _fb: FormBuilder, private _service: ConsultaClienteService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.visible && this.visible === true) {
    }
  }

  cancelar(event) {
    this.emitter.emit(undefined);
  }

  buscarUnidad(event) {
    this.getUnidadesSat(event.query);
  }

  getUnidadesSat(busqueda) {
    this._service.getGenerico('unidades/' + busqueda).subscribe(data => {
      this.filtroResultados = data;
    }, Error => {
    });
  }

  guardarProducto() {
    this.emitter.emit(this.producto);
    this.visible = false;
    // let detalle = this.factura.Detalles.find(d => d.Codigo === this.producto.Codigo);
    // if (detalle) {
    //   detalle = this.producto;
    //   // this.sacarTotal('aa');
    //   // this.visibleModificaProducto = false;
    // }
  }

}
