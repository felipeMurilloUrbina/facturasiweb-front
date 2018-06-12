import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ConsultaArchivoService } from './consulta-archivo.service';
import { Producto } from '../../modelos/index';
import { Cotizacion } from '../../modelos/cotizacion.model';
declare var $: any;
@Component({
  selector: 'app-consulta-archivo',
  templateUrl: './consulta-archivo.component.html',
  styleUrls: ['./consulta-archivo.component.css'],
  providers: [ConsultaArchivoService]
})
export class ConsultaArchivoComponent implements OnInit, OnChanges {
  @Input() cotizacion: any;
  @Input() visible;
  @Output() emitter = new EventEmitter();
  url = '';
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder, private _service: ConsultaArchivoService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.visible && this.visible === true) {
      this.get();
    }
  }

  get() {
    this.url =  this._service.getUrl() + '/' + this.cotizacion.Id + '/archivo';
    if (!this.cotizacion) {
      this._service.getId(this.cotizacion.Id).subscribe(data => {
        this.cotizacion = data;
        this._service.cerrarEsperando();
      }, Error => {
        console.log(Error);
      });
    }else {
      this._service.cerrarEsperando();
    }
  }

  antesEnviar(event) {
    event.xhr.setRequestHeader('token', localStorage.getItem('token'));
    event.xhr.setRequestHeader('sucursal', localStorage.getItem('sucursal'));
  }

  onUpload($event) {
    this._service.enviarMensaje('success', 'Cotización',  'Archivo subido correctamente');
  }

  onError(event) {
    console.log(event);
  }

  getArchivo(archivo) {
    window.open(this._service.getUrl() + '/' + archivo.CotizacionId + '/archivo/' + archivo.Id);
  }

  cerrar() {
    this.emitter.emit(undefined);
  }

  seleccionar(data) {
    this.emitter.emit(data.data);
  }
}
