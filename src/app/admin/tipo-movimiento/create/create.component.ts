import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DataScrollerModule } from 'primeng/primeng';
import { TipoMovimientoService } from '../tipo-movimiento.service';
import { TipoMovimiento } from '../../../modelos/tipo-movimiento.model';

declare var $: any;
@Component({
  selector: 'app-create-almacen',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [TipoMovimientoService]
})
export class CreateTipoMovimientoComponent implements OnInit {
  id: number;
  estadoSeleccionado: string;
  localidadesString: string[] = [];
  correos: string[] = [];
  correo: string;
  tipoMovimiento: TipoMovimiento;
  tipoMovimientos = [];
  titulo = 'Nuevo Tipo de Movimiento';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private _service: TipoMovimientoService) {
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
    this.tipoMovimiento = new TipoMovimiento();
  }

  getId(id) {
    this._service.getId(id).subscribe(data => {
      this.tipoMovimiento = data;
      this.setForm(this.tipoMovimiento);
    }, Error => {
      console.log(Error);
    });
  }
  get() {
    this._service.get().subscribe(data => {
      this.tipoMovimientos = data;
    }, error => {

    });
  }

  setForm(tipoMovimiento) {
    if (tipoMovimiento !== null ) {
      this.tipoMovimiento = tipoMovimiento;
    }
  }

  guardar() {
    this.tipoMovimiento.Id = this.id;
    if ((this.tipoMovimiento.Tipo === '') || (this.tipoMovimiento.Codigo === ''))  {
      this._service.enviarMensaje('warning', 'Tipo de Movimiento', 'algunos datos son necesarios.');
      return false;
    }
    this._service.guardar(this.tipoMovimiento, '').subscribe(data => {
      this.procesoLimpiar(1, data);
    }, error => {
      this.procesoLimpiar(2, JSON.parse(error._body).Message );
    });
  }

  procesoLimpiar(opcion, mensaje) {
    switch (opcion) {
      case 1:
        this._service.enviarMensaje('success', 'Tipo de Movimiento', 'Tipo de Movimiento guardado correctamente');
      break;
      case 2:
        this._service.enviarMensaje('error', 'Tipo de Movimiento', mensaje);
      break;
    }
    setTimeout(() => {
      this.regresar();
    }, 600);
  }

  regresar() {
    this._router.navigate(['/admin/tipos-movimientos'], { queryParams: {} });
  }
}
