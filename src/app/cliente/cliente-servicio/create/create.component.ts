import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Servicio } from '../../../modelos/servicio.model';
import { ServicioDetalle } from '../../../modelos/servicio-detalle.model';
import { ClienteServicioService } from '../servicio.service';

declare var $: any;
@Component({
  selector: 'app-create-servicio',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ClienteServicioService]
})
export class CreateClienteServicioComponent implements OnInit {
  equipos: any[];
  equipoId = 0;
  servicio: Servicio;
  estadoSeleccionado: string;
  localidadesString: string[] = [];
  clientes: any[];
  fecha = new Date();
  visibleConsultaProducto = false;
  productos: any[];
  id: number;
  constructor(private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder, private _service: ClienteServicioService) {
    this.servicio = new Servicio();
    this._route.params
      .subscribe(params => {
        this.equipoId = params['equipoId'];
        if (this.equipoId !== undefined) {
          this.servicio.EquipoId = this.equipoId;
        }
        if (params['id'] !== undefined) {
          this.id = params['id'];
          this.getServicio(this.id);
        }
      });
  }

  ngOnInit() {
    this.getEquipos();
  }

  getEquipos() {
    this._service.getGenerico('equipo').subscribe(data => {
      this.equipos = data;
    });
  }

  getServicio(id) {
    this._service.getId(id).subscribe(data => {
      // this.servicio = <Servicio>data;
      let  productos: ServicioDetalle[] = [...this.servicio.Detalles];
      this.servicio.EquipoId = data.EquipoId;
      this.servicio.Observacion = data.Observacion;
      this.servicio.Mecanico = data.Mecanico;
      data.Detalles.forEach(element => {
        let servicioDetalle = new ServicioDetalle();
        servicioDetalle.Cantidad = element.Cantidad;
        servicioDetalle.Precio = element.Precio;
        servicioDetalle.Codigo = element.Codigo;
        servicioDetalle.Descripcion = element.Descripcion;
        productos.push(servicioDetalle);
        this.servicio.Detalles = productos;
      });
      console.log(this.servicio.Detalles);
    }, error => {
      this._service.enviarMensaje('error', 'Error', JSON.parse(error._body).Message);
      this.regresar();
    });
  }

  selectProducto(event) {
    if (event) {
      let  productos: any[] = [...this.servicio.Detalles];
      let producto = this.servicio.Detalles.find(dt => dt.Codigo === event.data.Codigo);
      if (producto) {
        producto.Cantidad++;
      } else {
      let detalle = new ServicioDetalle();
      detalle.Codigo = event.data.Codigo;
      detalle.Descripcion = event.data.Descripcion;
      detalle.Precio = event.data.Precio;
      detalle.ServicioId = 0;
      detalle.Cantidad = 1;
      productos.push(detalle);
      this.servicio.Detalles = productos;
      this.visibleConsultaProducto = false;
      }
    }
  }



  abrirConsultaProducto() {
    this.visibleConsultaProducto = true;
    if (!this.productos) {
      this._service.getGenerico('producto').subscribe(data => {
        this.productos = data;
      });
    }
  }

  guardar() {
    this._service.guardar(this.servicio, '').subscribe(data => {
      this.procesoLimpiar(1);
    }, error => {
      this.procesoLimpiar(2);
    });
  }

  procesoLimpiar(opcion) {
    switch (opcion) {
      case 1:
        this._service.enviarMensaje('success', 'Servicio', 'Servicio guardado correctamente');
      break;
      case 2:
        this._service.enviarMensaje('error', 'Servicio', 'Error al servicio');
      break;
    }
    setTimeout(() => {
      this.regresar();
    }, 600);
  }

  regresar() {
    this._router.navigate(['/admin/cliente-servicios'], { queryParams: {} });
  }

}
