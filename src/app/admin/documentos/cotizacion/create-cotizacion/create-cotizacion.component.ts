import { Component, OnInit } from '@angular/core';
import { Cotizacion } from '../../../../modelos/cotizacion.model';
import { CotizacionService } from '../cotizacion.service';
import { Cliente } from '../../../../modelos';
import { DetalleCotizacion } from '../../../../modelos/detalle-cotizacion.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-cotizacion',
  templateUrl: './create-cotizacion.component.html',
  styleUrls: ['./create-cotizacion.component.css'],
  providers: [CotizacionService]
})
export class CreateCotizacionComponent implements OnInit {
  cotizacion: Cotizacion;
  metodoPagos: any[];
  formaPagos: any[];
  sucursales: any[];
  sucursalId = 0;
  blockearPanel = false;
  consultaProducto = false;
  consultaCliente  = false;
  consultaArchivo = false;
  tieneCuenta = false;
  productos = [];
  url = '';
  constructor(private _route: ActivatedRoute, private _router: Router, private _service: CotizacionService) {
    this.cotizacion = new Cotizacion();
    this._route.params
    .subscribe(params => {
      this.cotizacion.Id = params['id'];
    });
   }

  ngOnInit() {
    this.iniciarCotizacion();
    this.sucursales = JSON.parse(localStorage.getItem('sucursales'));
    this.sucursalId = parseInt(localStorage.getItem('sucursal'), 0);
    this.cotizacion.Sucursal = this.sucursales.find(s => s.Id === this.sucursalId);
  }

  iniciarCotizacion() {
    this._service.activarEsperando();
    this._service.getGenerico('util/metodos-pago').subscribe(data => {
      this.metodoPagos = data;
    }, error => {
      this._service.enviarMensaje('error', 'Error', 'Error, al  cargar los datos en el sistema.');
    }, () => {
      this._service.cerrarEsperando();
    });

    this._service.getGenerico('util/formas-pago').subscribe(data => {
      this.formaPagos = data;
    }, error => {
      this._service.enviarMensaje('error', 'Error', 'Error, al  cargar los datos en el sistema.');
    }, () => {
      this._service.cerrarEsperando();
    });
    if (this.cotizacion.Id !== 0) {
      this.url =  this._service.getUrl() + '/' + this.cotizacion.Id + '/archivo';
      this.cotizacion = this._service.getCotizacion(this.cotizacion.Id);
    } else {
      this._service.getGenerico('cotizaciones/nueva').subscribe(data => {
        this.cotizacion.Serie = data.Serie;
        this.cotizacion.Folio = data.Folio;
      }, error => {
      });
    }
  }

  onConsultarCliente() {
    this._service.activarEsperando();
    this.consultaCliente = true;
  }

  selecccionarCliente(cliente) {
    this.consultaCliente =  false;
    if (cliente) {
      this.cotizacion.Cliente  = <Cliente>cliente;
      this.cotizacion.ClienteId = cliente.Id;
    }
  }

  onConsultarProducto() {
    this._service.activarEsperando();
    this.consultaProducto = true;
  }

  seleccionarProducto(producto) {
    if (producto) {
      if (parseInt(producto.TasaDesc, 0) > 100) {
        this._service.enviarMensaje('warning', 'Error', 'Error el Descuento no puede ser  mayor de 100');
        producto.TasaDesc = 0;
        return false;
      }
      const productos: DetalleCotizacion[] = [...this.cotizacion.Detalles];
      const detalle = new DetalleCotizacion();
      detalle.CotizacionId = 0;
      detalle.Codigo = productos.filter(p => p.Codigo.indexOf(producto.Codigo) > -1).length > 0 ?  producto.Codigo + '-00' +
                       productos.filter(p => p.Codigo.indexOf(producto.Codigo) > -1).length : producto.Codigo;
      detalle.Descripcion = producto.Descripcion;
      detalle.Precio = producto.Precio;
      detalle.Cantidad = 1;
      detalle.TasaIva = producto.TasaIva;
      detalle.TasaIeps = producto.TasaIeps;
      detalle.TasaRetIva = producto.TasaRetIva;
      detalle.TasaRetIsr = producto.TasaRetIsr;
      detalle.CatSatProducto = producto.CatalogoSat;
      detalle.CatSatUnidad = producto.CatSatUnidad;
      detalle.FechaCaducidad = producto.FechaCaducidad;
      detalle.Lote = producto.Lote;
      detalle.Complemento = '';
      productos.push(detalle);
      this.cotizacion.Detalles = productos;
    }
    this.consultaProducto = false;
  }

  onCambioMetodo(metodoPagoId) {
    this.tieneCuenta = this.formaPagos.find(f => f.Id === parseInt(metodoPagoId, 0))
    ?  this.formaPagos.find(f => f.Id === parseInt(metodoPagoId, 0)).Bancarizado : false;
  }

  verArchivos() {
    this.consultaArchivo = true;
  }

  antesEnviar(event) {
    event.xhr.setRequestHeader('token', localStorage.getItem('token'));
    event.xhr.setRequestHeader('sucursal', localStorage.getItem('sucursal'));
  }

  onUpload($event) {
    this._service.enviarMensaje('success', 'Cotización',  'Archivo subido correctamente');
  }

  onError(event) {
    console.log(event);
  }

  guardar() {
    if ((this.cotizacion.Detalles) && (this.cotizacion.Detalles.length === 0)) {
      this._service.enviarMensaje('warning', 'Productos', 'Favor, de agregar un producto al detalle');
      return false;
    }
    if (!this.cotizacion.Cliente) {
      this._service.enviarMensaje('warning', 'Cliente', 'Favor, de seleccionar un cliente');
      return false;
    }
    this._service.guardar(this.cotizacion, '').subscribe(data => {
      this._service.enviarMensaje('success', 'Cotización',  'Cotización guardado correctamente');
      this._service.cerrarEsperando();
    }, error => {
      this._service.cerrarEsperando();
      this._service.enviarMensaje('error', 'Error',
      JSON.parse(error._body).Message ?  JSON.parse(error._body).Message : 'Error al guardar la cotización');
    }, () => {
      this._service.cerrarEsperando();
      // this.procesoLimpiar();
    });
  }

  regresar() {
    this._router.navigate(['/admin/cotizaciones'], { queryParams: {} });
  }
}
