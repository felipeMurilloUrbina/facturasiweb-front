import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Proveedor } from '../../../modelos/proveedor.model';
import { ClienteService } from '../cliente.service';

declare var $: any;
@Component({
  selector: 'app-create-cliente',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ClienteService]
})
export class CreateClienteComponent implements OnInit {
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
  proveedor: Proveedor;
  titulo = 'Nuevo Cliente';

  constructor(private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder, private _service: ClienteService) {
    this._route.params
      .subscribe(params => {
        this.id = params['id'];
        if (this.id !== undefined) {
          this.getproveedor(this.id);
        } else {
          this.setForm(null);
        }
      });
    this.getcatalogos();
  }

  ngOnInit() {
    this.proveedor = new Proveedor();
  }

  getcatalogos() {
    this._service.getGenerico('util/catalogos').subscribe(data => {
      this.paises = data.Paises;
    }, Error => {
      console.log(Error);
    });
  }

  buscar(event) {
    if (this.localidades) {
      this.localidadesString = this.buscarCiudad(event.query);
    }
  }

  onTabOpen(e) {
    this.cargarFactura = true;
  }

  buscarCiudad(query): any[] {
    const filtered: string[] = [];
      for (let i = 0; i < this.localidades.length; i++) {
        const ciudad = this.localidades[i];
        if (this.localidades[i].Localidad.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filtered.push(ciudad.Localidad);
        }
      }
    return filtered;
  }

  getproveedor(id) {
    this._service.getId(id).subscribe(data => {
      this.proveedor = data;
      this.setForm(this.proveedor);
    }, Error => {
      console.log(Error);
    });
  }

  setForm(proveedor) {
    if (proveedor !== null ) {
      this.onChangeEstado(proveedor.Estado);
      this.estadoSeleccionado = proveedor.Estado;
      if ((proveedor.Correo) && (proveedor.Correo !== '')) {
        this.correos = JSON.parse(proveedor.Correo);
      }
    }
  }

  select(event) {
    const localidad = this.localidades.find(l => l.Localidad === event);
  }

  onChangeEstado(event) {
   this.estadoSeleccionado = event;
   this._service.getGenerico('util/' + event).subscribe(data => {
      this.municipios  = data;
    });
  }

  agregarCorreo() {
    if (this.emailRegex.test(this.correo)) {
      this.correos.push(this.correo);
    } else {
      this._service.enviarMensaje('warning', 'Correo', 'Favor de ingresar un correo valido');
    }
    this.correo = '';
    $('#correo').val('');
  }

  onChangeMun(event) {
    this.buscarLocalidades(this.estadoSeleccionado, event);
  }

  buscarLocalidades(estado, municipio) {
    this._service.getGenerico('util/' + estado + '/' + municipio ).subscribe(data => {
      this.localidades  = data;
    }, Error => {
      console.log(Error);
    });
  }

  guardar() {
    this.proveedor.Id = this.id;
    this.proveedor.Correo = JSON.stringify(this.correos);
    this._service.guardar(this.proveedor, '').subscribe(data => {
      this.procesoLimpiar(1, data);      
    }, error => {
      this.procesoLimpiar(2, JSON.parse(error._body).Message );
    });
  }

  procesoLimpiar(opcion, mensaje) {
    switch (opcion) {
      case 1:
        this._service.enviarMensaje('success', 'Cliente', mensaje);
      break;
      case 2:
        this._service.enviarMensaje('error', 'Cliente', mensaje);
      break;
    }
    setTimeout(() => {
      this.regresar();
    }, 600);
  }

  regresar() {
    this._router.navigate(['/admin/clientes'], { queryParams: {} });
  }

  cerrar(Id) {
    this.correos.splice(this.correos.findIndex(r => r === Id), 1);
  }

}
