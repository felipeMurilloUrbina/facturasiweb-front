import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PuntoVentaService } from '../punto-venta.service';
import { JwtHelper } from 'angular2-jwt';
import { PuntoVenta } from '../../../../modelos/punto-venta.model';
import { PuntoVentaDetalle } from '../../../../modelos/punto-venta-detalle.model';
import { Cliente, Producto } from '../../../../modelos/index';

declare var $: any;
@Component({
  selector: 'app-create-punto-venta',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [PuntoVentaService, JwtHelper]
})
export class PuntoVentaComponent implements OnInit, AfterViewInit {
  user: any;
  productos: Producto[] = [];
  consultaProducto = false;
  consultaCliente = false;
  cobrarVenta  = false;
  puntoVenta: PuntoVenta;
  codigo = '';
  caja: any;
  cliente: Cliente;
  turnoId = 0;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private _jwtHelper: JwtHelper,
    private _service: PuntoVentaService) {
      this._route.params
      .subscribe(params => {
        this.turnoId = params['turnoId'];
        if (this.turnoId !== undefined) {
          this.getTurno();
        } else {
          this._router.navigate(['/admin/turnos/seleccionar']);
        }
      });
      this.user = JSON.parse(this._jwtHelper.decodeToken(localStorage.getItem('token')).user);
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.puntoVenta = new PuntoVenta();
    this.getFolio();
    this.getProductos();
  }

  getTurno() {
    this._service.getGenerico('turno/' + localStorage.getItem('sucursalId') + '/' + this.turnoId).subscribe(data => {
      console.log(data);
      this.caja = data.Caja;
      this.puntoVenta.TurnoId = this.turnoId;
      this.puntoVenta.CajaId = data.CajaId;
    }, error => {
      this._service.enviarMensaje('error', 'Turnos', 'No existe turno');
      this._router.navigate(['/admin/turnos/seleccionar']);
    });
  }

  getProductos() {
    this._service.getGenerico('producto').subscribe(data => {
      this.productos = data;
    }, Error => {
    });
  }

  getFolio() {
    this._service.activarEsperando();
    this._service.getGenerico('punto-venta/' + localStorage.getItem('sucursalId')).subscribe(data => {
      this.puntoVenta.Folio = data;
      this._service.cerrarEsperando();
    });
  }

  eventHandler(event) {
   if (event === 13) {
    let producto  =  this.productos.find(p => p.Codigo == this.codigo);
    if (producto) {
      this.seleccionarProducto(producto);
    } else {
      this._service.enviarMensaje('warning', 'No Existe', 'No Existe Articulo');
    }

   }
  }

  cambiarUsuario(user) {
    
  }

  buscarProducto() {
    this.consultaProducto = true;
  }

  cambiarCliente() {
    this.consultaCliente = true;
  }

  seleccionarProducto(event) {
    if (event) {
      let  productos: PuntoVentaDetalle[] = [...this.puntoVenta.Detalles];
      let producto = this.puntoVenta.Detalles.find(dt => dt.Codigo === event.Codigo);
      if (producto) {
        producto.Cantidad++;
      } else {
      producto = new  PuntoVentaDetalle();
      producto.Codigo = event.Codigo;
      producto.Descripcion = event.Descripcion;
      producto.Precio = event.Precio;
      producto.TasaIva = event.TasaIva;
      producto.TasaIeps = event.TasaIeps;
      producto.TasaDesc = event.TasaDesc;
      producto.Cantidad++;
      productos.push(producto);
      this.puntoVenta.Detalles = productos;
      }
    }
    this.consultaProducto = false;
    $('#codigo').focus();
    this.codigo = '';
  }

  seleccionarCliente(event) {
    if (event) {
      this.puntoVenta.ClienteId = event.Id;
      this.cliente = <Cliente>event;
    }
    this.consultaCliente = !this.consultaCliente;
  }

  cobrar() {
    if ((this.puntoVenta) && (this.puntoVenta.Detalles.length > 0)) {
      this.cobrarVenta = true;
    } else {
      this._service.enviarMensaje('warning', 'Nota de Venta', 'Seleccione al menos un articulo');
    }
  }

  guardar(event) {
    if (event) {
      console.log(event);
      this._service.guardar(this.puntoVenta, '').subscribe(data => {
        console.log(data);
      });
    }
  }

}
