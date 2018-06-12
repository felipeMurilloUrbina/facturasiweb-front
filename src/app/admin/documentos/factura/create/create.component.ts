import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FacturaService } from '../factura.service';
import { Factura, FactDetalle, ComplementoIedu, Producto, Cliente } from '../../../../modelos';
import { detachEmbeddedView } from '@angular/core/src/view/view_attach';
import { Complemento } from '../../../../modelos/complemento.model';
declare var $: any;
@Component({
  selector: 'app-create-nueva-factura',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [FacturaService]
})
export class CreateFacturaComponent implements OnInit {
  factura: Factura;
  complementoForm: FormGroup;
  sucursales: any[];
  sucursalId: number;
  servicioId: number;
  blockedPanel: Boolean= false;
  metodoPagos: any[] = [];
  formaPagos: any[] = [];
  usoCFDIs: any[] = [];
  productos: Producto[] = [];
  unidades: any[] = [];
  consultaProducto = false;
  modificaProducto = false;
  consultaCliente = false;
  consultaIne = false;
  tieneCuenta = false;
  visible = false;
  visibleAgregarComplemento = false;
  complementoSeleccionado = '';
  regimenes: any[] = [];
  detalleSeleccionado: FactDetalle;
  producto: FactDetalle;
  complementos: any[] = [{'label': 'Instituciones Educativas',
  'value': 'iedu'}];
  constructor(private _router: Router, private _route: ActivatedRoute, private _fb: FormBuilder, private _service: FacturaService) {
    this.factura = new Factura();
    this._route.params
    .subscribe(params => {
      this.servicioId = params['servicioId'];
    });
    this.sucursales = JSON.parse(localStorage.getItem('sucursales'));
    this.sucursalId = parseInt(localStorage.getItem('sucursal'), 0);
    this.factura.Sucursal = this.sucursales.find(s => s.Id === this.sucursalId);
  }

  ngOnInit() {
    if (!this.sucursalId) {
      this._service.enviarMensaje('error', 'Error', 'Registre una sucursal primero.');
      this.regresar();
    }
    this.iniciarFactura();
    this.getServicio();
    this.getProductos();
  }

  getProductos() {
    this._service.getGenerico('productos').subscribe(data => {
      this.productos = data;
    }, Error => {
    });
  }

  getServicio() {
    if (this.servicioId) {
      this._service.getGenerico('servicio/' + this.servicioId).subscribe(data => {
        const productos: FactDetalle[] = [...this.factura.Detalles];
        data.Detalles.forEach(element => {
          const producto = new FactDetalle();
          producto.CatalogoId = '1',
          producto.Codigo = element.Codigo,
          producto.Descripcion = element.Descripcion,
          producto.TasaIva = 0.160000,
          producto.TasaRetIsr = 0,
          producto.TasaRetIva = 0,
          producto.TasaIeps = 0,
          producto.Precio = element.Precio,
          producto.TasaDesc = 0,
          producto.Cantidad = element.Cantidad;
          productos.push(producto);
        });
        this.factura.Detalles = productos;
        this._service.getGenerico('clientes/' + data.Equipo.ClienteId ).subscribe(cliente => {
          this.factura.Cliente = cliente;
        });
      });
    }
  }

  iniciarFactura() {
    this._service.activarEsperando();
    this._service.getGenerico('util/metodos-pago').subscribe(data => {
      this.metodoPagos = data;
    }, error => {
      this._service.enviarMensaje('error', 'Error', 'Error, al  cargar los datos en el sistema.');
    }, () => {
      this._service.cerrarEsperando();
    });
    this._service.getGenerico('util/usocfdis').subscribe(data => {
      this.usoCFDIs = data;
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
    this._service.getGenerico('facturas/nueva').subscribe(data => {
      this.factura.Serie = data.Serie;
      this.factura.Folio = data.Folio;
      this.regimenes = data.Regimenes;
      this.factura.RegimenId = this.regimenes.find(r => r.IsDefault).RegimenId;
      this.factura.FormatoId = this.factura.Sucursal.FormatoId;
    }, error => {
      this._service.enviarMensaje('error', 'Error', 'Error, al  cargar los datos en el sistema.');
    }, () => {
      this._service.cerrarEsperando();
    });
  }

  cambioMetodo(event) {
    this.tieneCuenta = this.formaPagos.find(f => f.Id === parseInt(event, 0))
    ?  this.formaPagos.find(f => f.Id === parseInt(event, 0)).Bancarizado : false;
  }

  editar(detalle) {
    this.producto = detalle;
    this.modificaProducto = true;
  }

  guardarProducto(producto) {
    this.modificaProducto = false;
  }

  onConsultarProducto() {
    this.blockedPanel = true;
    this.consultaProducto = true;
  }

  abrirComplemento() {
    this.consultaIne = true;
  }

  agregarComplemento(producto) {
    this.detalleSeleccionado = producto;
    this.complementoForm = this._fb.group({
      NombreAlumno: '',
      CURP: '',
      NivelEducativo: '',
      AutRVOE: ''
    });
    this.visibleAgregarComplemento = true;
  }

  guardarComplemento() {
    const detalle = this.factura.Detalles.find(d => d.Codigo === this.detalleSeleccionado.Codigo);
    if (detalle) {
      let complementoIedu = new ComplementoIedu();
      complementoIedu.Version = '1.0';
      complementoIedu.NombreAlumno = this.complementoForm.value.NombreAlumno;
      complementoIedu.AutRVOE = this.complementoForm.value.AutRVOE;
      complementoIedu.CURP = this.complementoForm.value.CURP;
      complementoIedu.NivelEducativo = this.complementoForm.value.NivelEducativo;
      detalle.TipoComplemento = 'iedu';
      detalle.Complemento = JSON.stringify(complementoIedu);
    }
    this.visibleAgregarComplemento = false;
  }

  abrirConsultaCliente() {
    this.blockedPanel = true;
    this.consultaCliente = true;
  }

  selecccionarCliente(cliente) {
    if (cliente) {
    this.factura.Cliente  = <Cliente>cliente;
    this.consultaCliente =  false;
    }
  }

  seleccionarProducto(event) {
    if (event) {
      if (parseInt(event.TasaDesc, 0) > 100) {
        this._service.enviarMensaje('warning', 'Error', 'Error el Descuento no puede ser  mayor de 100');
        event.data.TasaDesc = 0;
        return false;
      }
      const productos: FactDetalle[] = [...this.factura.Detalles];
      const detalle = new FactDetalle();
      detalle.FacturaId = 0;
      detalle.CatalogoId = event.CatalogoId;
      detalle.UnidadId = event.UnidadId;
      detalle.Codigo = productos.filter(p => p.Codigo.indexOf(event.Codigo) > -1).length > 0 ?  event.Codigo + '-00' +
      productos.filter(p => p.Codigo.indexOf(event.Codigo) > -1).length : event.Codigo;
      detalle.Descripcion = event.Descripcion;
      detalle.Precio = event.Precio;
      detalle.Cantidad = 1;
      detalle.TasaIva = event.TasaIva;
      detalle.TasaIeps = event.TasaIeps;
      detalle.TasaRetIva = event.TasaRetIva;
      detalle.TasaRetIsr = event.TasaRetIsr;
      detalle.CatSatProducto = event.CatalogoSat;
      detalle.CatSatUnidad = event.CatSatUnidad;
      detalle.FechaCaducidad = event.FechaCaducidad;
      detalle.Lote = event.Lote;
      detalle.Complemento = '';
      productos.push(detalle);
      this.factura.Detalles = productos;
      // }
    }
    this.consultaProducto = false;
    // this.sacarTotal('aa');
  }

  guardarIne(ine) {
    if (ine) {
      this.factura.Complementos = [];
      this.factura.Complementos.push(
        {
          'Nombre': 'Ine',
          'Detalle': JSON.stringify(ine)
        });
      }
      this.consultaIne = false;
    }

    guardar() {
      if ((this.factura.Detalles) && (this.factura.Detalles.length === 0)) {
        this._service.enviarMensaje('warning', 'Productos', 'Favor, de agregar un producto al detalle');
        return false;
      }
      if (!this.factura.Cliente) {
        this._service.enviarMensaje('warning', 'Cliente', 'Favor, de seleccionar un cliente');
        return false;
      }
      if (this.factura.MetodoPagoId === 0) {
        this._service.enviarMensaje('warning', 'Metodo de  pago', 'Favor, de seleccionar un Metodo pago');
        return false;
      }
      if (this.factura.FormaPagoId === 0) {
        this._service.enviarMensaje('warning', 'Forma de pago', 'Favor, de seleccionar un Forma pago');
        return false;
      }
      if (this.factura.UsoCFDIId === 0) {
        this._service.enviarMensaje('warning', 'Forma de pago', 'Favor, de seleccionar un uso de CFDI');
        return false;
      }
      if (this.factura.PagoEn === '') {
        this._service.enviarMensaje('warning', 'Forma de pago', 'Favor, Poner las condiciones de  pago');
        return false;
      }
      this.factura.SucursalId = this.sucursalId;
      this.factura.ClienteId  = this.factura.Cliente.Id;
      this.factura.MetodoPago = this.metodoPagos.find(f => f.Id === this.factura.MetodoPagoId);
      this.factura.FormaPago = this.formaPagos.find(f => f.Id === this.factura.FormaPagoId);
      this.factura.Regimen = this.regimenes.find(f => f.Id === this.factura.RegimenId);
      this._service.activarEsperando();
      this._service.guardar(this.factura, '').subscribe(data => {
        this._service.enviarMensaje('success', 'Factura',  'Factura guardado correctamente');
        this._service.cerrarEsperando();
      }, error => {
        this._service.cerrarEsperando();
        this._service.enviarMensaje('error', 'Error',
        JSON.parse(error._body).Message ?  JSON.parse(error._body).Message : 'Error al guardar la factura');
      }, () => {
        this._service.cerrarEsperando();
        this.procesoLimpiar();
      });
    }

    procesoLimpiar() {
      this.factura.Detalles = [];
      this.factura.MetodoPagoId = 0;
      this.factura.UsoCFDIId = 0;
      this.factura.FormaPagoId = 0;
      this.factura.Cliente = undefined;
      this.factura.ClienteId = 0;
      this.factura.Observacion = '';
      this.iniciarFactura();
    }

    eliminar(detalle) {
      this.factura.Detalles.splice(this.factura.Detalles.indexOf(detalle), 1);
      const productos = [...this.factura.Detalles];
      this.factura.Detalles = productos;
    }

    regresar() {
      this._router.navigate(['/admin/facturas'], { queryParams: {} });
    }
}
