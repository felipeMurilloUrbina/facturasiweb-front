import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CapturaDireccionService } from './captura-direccion.service';
import { Direccion } from '../../modelos/direccion.model';
declare var $: any;
@Component({
  selector: 'app-captura-direccion',
  templateUrl: './captura-direccion.component.html',
  styleUrls: ['./captura-direccion.component.css'],
  providers: [CapturaDireccionService]
})
export class CapturaDireccionComponent implements OnInit, OnChanges {
  emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  @Input() visible;
  @Input() direccion= new Direccion();
  @Output() emitter = new EventEmitter();
  correos = [];
  correo= '';
  // direccion: Direccion;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _service: CapturaDireccionService) {
  }

  ngOnInit() {
    
  }

  ngOnChanges(cambios: SimpleChanges) {
    console.log(cambios);
    if (this.visible && this.visible === true) {
    }
    // if (this.visible && this.visible === true) {
      
    //   this.direccion = cambios.direccion;
    // }
  }

  agregarCorreo() {
    if (this.emailRegex.test(this.correo)) {
      this.correos.push(this.correo);
    } else {
      this._service.enviarMensaje('warning', 'Correo', 'Favor de ingresar un correo valido');
    }
    this.correo = '';
  }
  eliminarCorreo(Id) {
    this.correos.splice(this.correos.findIndex(r => r === Id), 1);
  }

  guardar() {
  
  }

  cancelar() {
    this.emitter.emit(undefined);
  }

}
