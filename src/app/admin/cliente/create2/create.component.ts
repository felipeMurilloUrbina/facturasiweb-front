import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../../../modelos/cliente.model';

declare var $: any;
@Component({
  selector: 'app-create-cliente',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ClienteService]
})
export class CreateClienteComponent2 implements OnInit {
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
  cliente: Cliente;
  titulo = 'Nuevo Cliente';
  sucursales: any[];
  constructor(private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder, private _service: ClienteService) {
    this._route.params
      .subscribe(params => {
        this.id = params['id'];
        if (this.id !== undefined) {
          this.getcliente(this.id);
        } else {
          this.setForm(null);
        }
      });
    this.getcatalogos();
  }

  ngOnInit() {
    this.cliente = new Cliente();
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

  getcliente(id) {
    this._service.getId(id).subscribe(data => {
      this.cliente = data;
      this.setForm(this.cliente);
    }, Error => {
      console.log(Error);
    });
  }

  setForm(cliente) {
    if (cliente !== null ) {
      cliente.Direcciones
      this.onChangeEstado(cliente.Estado);
      this.estadoSeleccionado = cliente.Estado;
      if ((cliente.Correo) && (cliente.Correo !== '')) {
        this.correos = JSON.parse(cliente.Correo);
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
    this.cliente.Id = this.id;
    this.cliente.Correo = JSON.stringify(this.correos);
    this._service.guardar(this.cliente, '').subscribe(data => {
      this.procesoLimpiar(1);
    }, error => {
      this.procesoLimpiar(2);
    });
  }

  procesoLimpiar(opcion) {
    switch (opcion) {
      case 1:
        this._service.enviarMensaje('success', 'Cliente', 'Cliente guardado correctamente');
      break;
      case 2:
        this._service.enviarMensaje('error', 'Cliente', 'Error al Cliente');
      break;
    }
    setTimeout(() => {
      this.regresar();
    }, 600);
  }

  regresar() {
    this._router.navigate(['/clientes'], { queryParams: {} });
  }

}
