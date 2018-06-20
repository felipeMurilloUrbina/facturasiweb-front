import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SucursalService } from '../sucursal.service';
import { Sucursal } from '../../../modelos/sucursal.model';
declare var $: any;
@Component({
  selector: 'app-create-sucursal',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [SucursalService]
})
export class CreateSucursalComponent implements OnInit {
  regexRFC: RegExp  = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
  sucursalForm: FormGroup;
  regimenes: any[];
  formatos: any[];
  municipios: any[];
  localidades: any[];
  paises: any[];
  url: string;
  id: number;
  imgFormato: string;
  estadoSeleccionado: string;
  regimenesSeleccionados: any[] = [];
  localidadesString: string[] = [];
  sucursal: Sucursal;
  titulo = 'Nuevo Sucursal';

  constructor(private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder, private _service: SucursalService) {
    this.setForm(undefined);
    this._route.params
      .subscribe(params => {
        this.id = params['id'];
      });
  }

  ngOnInit() {
    this.sucursal = new Sucursal();
    this.getcatalogos();
  }

  onCambioFormato(valor) {
    if (valor !== '') {
      this.imgFormato = this.formatos.find(f => f.Id === parseInt(valor, 0)).ImagenMiniatura;
    }
  }

  buscar(event) {
    if (this.localidades) {
      this.localidadesString = this.buscarCiudad(event.query);
    }
  }

  buscarCiudad(query): any[] {
    const filtered: any[] = [];
      for (let i = 0; i < this.localidades.length; i++) {
        const Ciudad = this.localidades[i];
        if (this.localidades[i].Localidad.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filtered.push(Ciudad.Localidad);
        }
      }
    return filtered;
  }

  select(event) {
    const localidad = this.localidades.find(l => l.Localidad === event);
  }

  getSucursal(id) {
    if (id) {
      this._service.activarEsperando();
      this._service.getGenerico('sucursales/' + id).subscribe(data => {
        this._service.cerrarEsperando();
        this.sucursal = data;
        console.log(this.sucursal);
        this.setForm(this.sucursal);
        this.url =  this._service.getUrl() + '/' + id + '/archivo';
      }, error => {
      }, () => {
        this._service.cerrarEsperando();
      });
    }
  }

  setForm(sucursal) {
    if (sucursal) {
      console.log(this._service.getUrl());
      this.imgFormato = this.formatos.find(f => f.Id === parseInt(sucursal.FormatoId, 0)) ?
        this.formatos.find(f => f.Id === parseInt(sucursal.FormatoId, 0)).ImagenMiniatura : '';
      this.onChangeEstado(sucursal.Estado);
      this.estadoSeleccionado = sucursal.Estado;
      for (let i = 0; i < sucursal.Regimenes.length; i++) {
        sucursal.Regimenes[i].Regimen.IsDefault = sucursal.Regimenes[i].IsDefault;
        this.regimenesSeleccionados.push(sucursal.Regimenes[i].Regimen);
      }
    }
  }

  getcatalogos() {
    this._service.getGenerico('util/catalogos').subscribe(data => {
      this.regimenes = data.Regimenes;
      this.paises = data.Paises;
      this.formatos = data.Formatos;
      this.getSucursal(this.id);
    }, Error => {
      console.log(Error);
    });
  }

  setDefault(event, regimen) {
    this.regimenesSeleccionados.forEach(r => {
      r.IsDefault = false;
    });
    this.regimenesSeleccionados.find(r => r.Id === regimen.Id).IsDefault = event;
  }

  onChangeEstado(event) {
   this.estadoSeleccionado = event;
   this._service.getGenerico('util/' + event).subscribe(data => {
      this.municipios  = data;
    });
  }

  onChangeMun(event) {
    this.sucursal.Ciudad = '';
    this.buscarLocalidades(this.estadoSeleccionado, event);
  }

  buscarLocalidades(estado, municipio) {
    this._service.getGenerico('util/' + estado + '/' + municipio ).subscribe(data => {
      this.localidades  = data;
    }, Error => {
      console.log(Error);
    });
  }

  cerrar(Id) {
    this.regimenesSeleccionados.splice(this.regimenesSeleccionados.findIndex(r => r.Id === Id), 1);
  }

  onChange(event) {
    if (this.regimenesSeleccionados.filter(r => r.Id === parseInt(event, 0)).length === 0) {
      const regimen =  this.regimenes.find(r => r.Id === parseInt(event, 0));
      if (regimen) {
        regimen.default = true;
        this.regimenesSeleccionados.push(regimen);
      }
    }
  }

  guardar() {
    if (!this.regimenesSeleccionados.find(r => r.IsDefault === true)) {
      this._service.enviarMensaje('warning', 'Error', ' Favor de poner un regimen predeterminado');
      return false;
    }
    if (this.sucursal.Serie === '') {
      this._service.enviarMensaje('warning', 'Error', ' Favor de escribir una serie es necesaria');
      return false;
    }
    const  regimenesG = [];
    this.regimenesSeleccionados.forEach(r => {
      regimenesG.push({
        SucursalId: this.sucursal.Id,
        RegimenId: r.Id,
        IsDefault: r.IsDefault
      });
    });
    this.sucursal.Regimenes = regimenesG;
    this._service.guardar(this.sucursal, '').subscribe(data => {
      this.procesoLimpiar(1, data);      
    }, error => {
      this.procesoLimpiar(2, JSON.parse(error._body).Message);      
    });
  }

  procesoLimpiar(opcion, mensaje) {
    switch (opcion) {
      case 1:
        this._service.enviarMensaje('success', 'Productos', mensaje);
      break;
      case 2:
        this._service.enviarMensaje('error', 'Productos', mensaje);
      break;
    }
  }

  regresar() {
    setTimeout(() => {
      this._router.navigate(['/admin/sucursales'], { queryParams: {} });
    }, 600);
  }

  onBeforeSend(event) {
    event.xhr.setRequestHeader('token', localStorage.getItem('token'));
  }

  onUpload(event) {
    this._service.enviarMensaje('success', 'Archivo subido', event.xhr.responseText);
  }

  onError(event) {

  }


}
