import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DataScrollerModule } from 'primeng/primeng';
import { LineaService } from '../linea.service';
import { Linea } from '../../../modelos/linea.model';

declare var $: any;
@Component({
  selector: 'app-create-almacen',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [LineaService]
})
export class CreateLineaComponent implements OnInit {
  id: number;
  estadoSeleccionado: string;
  localidadesString: string[] = [];
  correos: string[] = [];
  correo: string;
  cargarFactura = false;
  linea: Linea;
  lineas = [];
  titulo = 'Nueva Linea';
  
  constructor(private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder, private _service: LineaService) {
    this._route.params
      .subscribe(params => {
        this.id = params['id'];
        if (this.id !== undefined) {
          this.getId(this.id);
        } else {
          this.setForm(null);
        }
      });
  }

  ngOnInit() {
    this.get();
    this.linea = new Linea();
  }

  getId(id) {
    this._service.getId(id).subscribe(data => {
      this.linea = data;
      this.setForm(this.linea);
    }, Error => {
      console.log(Error);
    });
  }
  get() {
    this._service.get().subscribe(data => {
      this.lineas = data;
    }, error => {

    });
  }

  setForm(linea) {
    if (linea !== null ) {
      this.linea = linea;
    }
  }

  guardar() {
    this.linea.Id = this.id;
    if ((this.linea.Descripcion === '')) {
      this._service.enviarMensaje('warning', 'Linea', 'algunos datos son necesarios.');
      return false;
    }
    this._service.guardar(this.linea, '').subscribe(data => {
      this.procesoLimpiar(1, data);
    }, error => {
      this.procesoLimpiar(2, JSON.parse(error._body).Message );
    });
  }

  procesoLimpiar(opcion, mensaje) {
    switch (opcion) {
      case 1:
        this._service.enviarMensaje('success', 'Linea', 'Linea guardado correctamente');
      break;
      case 2:
        this._service.enviarMensaje('error', 'Linea', mensaje);
      break;
    }
    setTimeout(() => {
      this.regresar();
    }, 600);
  }

  regresar() {
    this._router.navigate(['/admin/lineas'], { queryParams: {} });
  }
}
