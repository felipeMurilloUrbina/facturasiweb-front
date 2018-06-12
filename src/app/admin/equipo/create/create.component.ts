import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EquipoService } from '../equipo.service';
import { Equipo } from '../../../modelos/equipo.model';

declare var $: any;
@Component({
  selector: 'app-create-equipo',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [EquipoService]
})
export class CreateEquipoComponent implements OnInit {
  municipios: any[];
  id: number;
  estadoSeleccionado: string;
  localidadesString: string[] = [];
  equipo: Equipo;
  clientes: any[];
  titulo = 'Nuevo Equipo';

  constructor(private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder, private _service: EquipoService) {
    this._route.params
      .subscribe(params => {
        this.id = params['id'];
        if (this.id !== undefined) {
          // this.getcliente(this.id);
        } else {
          // this.setForm(null);
        }
      });
  }

  ngOnInit() {
    this.equipo = new Equipo();
    this.getClientes();
  }

  getClientes() {
    this._service.getGenerico('clientes').subscribe(data => {
      this.clientes = data;
      this.getEquipo(this.id);
    });
  }

  getEquipo(id) {
    if (id) {
      this._service.getGenerico('equipo/' + id).subscribe(data => {
        this.equipo = <Equipo>data;
      }, Error => {
        console.log(Error);
      });
    }
  }

  onChangeEstado(event) {
   this.estadoSeleccionado = event;
   this._service.getGenerico('util/' + event).subscribe(data => {
      this.municipios  = data.Municipios;
    });
  }



  // onChangeMun(event) {
  //   this.buscarLocalidades(this.estadoSeleccionado, event);
  // }

  // buscarLocalidades(estado, municipio) {
  //   this._service.getGenerico('util/' + estado + '/' + municipio ).subscribe(data => {
  //     this.localidades  = data.Localidades;
  //   }, Error => {
  //     console.log(Error);
  //   });
  // }

  guardar() {
    if (this.equipo.Descripcion === '') {
      this._service.enviarMensaje(1, '', 'Favor de escribir una descripcion');
    }
    this.equipo.Id = this.id;
    this._service.guardar(this.equipo, '').subscribe(data => {
      this.procesoLimpiar(1);
    }, error => {
      this.procesoLimpiar(2);
    });
  }

  procesoLimpiar(opcion) {
    switch (opcion) {
      case 1:
        this._service.enviarMensaje('success', 'Equipo', 'Equipo guardado correctamente');
      break;
      case 2:
        this._service.enviarMensaje('error', 'Equipo', 'Error al equipo');
      break;
    }
    setTimeout(() => {
      this.regresar();
    }, 600);
  }

  regresar() {
    this._router.navigate(['/admin/equipos'], { queryParams: {} });
  }

}
