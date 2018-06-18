import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CapturaDireccionService } from './captura-direccion.service';
import { Direccion } from '../../modelos/direccion.model';
import { Contacto } from '../../modelos/contacto.model';
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
  paises = [];
  estados : any[];
  municipios: any[];
  localidades:any[];
  localidad: any;
  estadoSeleccionado: string;
  contactos: Contacto[];
  contacto: Contacto = new Contacto();
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _service: CapturaDireccionService) {
  }

  ngOnInit() {
    this.getcatalogos();
    $('#telefono').inputmask();
    this.estados = this._service.getEstados();
    this.contactos = [];
  }

  getcatalogos() {
    this._service.getGenerico('util/catalogos').subscribe(data => {
      this.paises = data.Paises;
    }, Error => {
      console.log(Error);
    });
  }

  ngOnChanges(cambios: SimpleChanges) {
    console.log(cambios);
    if (this.visible && this.visible === true) {
    }
    // if (this.visible && this.visible === true) {
      
    //   this.direccion = cambios.direccion;
    // }
  }

  onCambioEstado(event) {
    this.estadoSeleccionado = event;
    this._service.getGenerico('util/' + event).subscribe(data => {
       this.municipios  = data;
       console.log(this.municipios);
     });
  }
 
  onCambioMun(event) {
    this.buscarLocalidades(this.estadoSeleccionado, event);
  }
  
  buscarLocalidades(estado, municipio) {
    this._service.getGenerico('util/' + estado + '/' + municipio ).subscribe(data => {
      this.localidades  = data;
    }, Error => {
      console.log(Error);
    });
  }
  agregarContacto() {
    if ((this.contacto.Nombre) &&(this.contacto.Nombre !=='')) {
      this.contactos.push(this.contacto);
      this.contacto = new Contacto();
    } else {
      this._service.enviarMensaje('warning', 'Correo', 'Favor de ingresa nombre al contacto');    
    }
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
