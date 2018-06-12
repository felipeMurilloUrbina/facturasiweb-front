import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlmacenService } from '../almacen.service';
import { Almacen } from '../../../modelos/almacen.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DataScrollerModule } from 'primeng/primeng';

declare var $: any;
@Component({
  selector: 'app-create-almacen',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [AlmacenService]
})
export class CreateAlmacenComponent implements OnInit {
  titulo = 'Nuevo Almacen';
  emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  municipios: any[];
  localidades: any[];
  localidad: any;
  paises: any[];
  id: number;
  estadoSeleccionado: string;
  localidadesString: string[] = [];
  correos: string[] = [];
  correo: string;
  cargarFactura = false;
  almacen: Almacen;
  constructor(private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder, private _service: AlmacenService) {
    this._route.params
      .subscribe(params => {
        this.id = params['id'];
        if (this.id !== undefined) {
          this.get(this.id);
        } else {
          this.setForm(null);
        }
      });
    this.getcatalogos();
  }

  ngOnInit() {
    this.almacen = new Almacen();
  }

  getcatalogos() {
    this._service.getGenerico('util/catalogos').subscribe(data => {
      this.paises = data.Paises;
    }, Error => {
      console.log(Error);
    });
  }

  get(id) {
    this._service.getId(id).subscribe(data => {
      this.almacen = data;
      this.setForm(this.almacen);
    }, Error => {
      console.log(Error);
    });
  }

  setForm(almacen) {
    if (almacen !== null ) {
      this.almacen = almacen;
    }
  }

  guardar() {
    this.almacen.Id = this.id;
    if ((this.almacen.Codigo === '') || (this.almacen.Descripcion === '')) {
      this._service.enviarMensaje('warning', 'Almacen', 'algunos datos son necesarios.');
      return false;
    }
    this._service.guardar(this.almacen, '').subscribe(data => {
      this.procesoLimpiar(1, data);
    }, error => {
      this.procesoLimpiar(2, JSON.parse(error._body).Message );
    });
  }

  procesoLimpiar(opcion, mensaje) {
    switch (opcion) {
      case 1:
        this._service.enviarMensaje('success', 'Almacen', 'Almacen guardado correctamente');
      break;
      case 2:
        this._service.enviarMensaje('error', 'Almacen', mensaje);
      break;
    }
    setTimeout(() => {
      this.regresar();
    }, 600);
  }

  regresar() {
    this._router.navigate(['//almacenes'], { queryParams: {} });
  }
}
