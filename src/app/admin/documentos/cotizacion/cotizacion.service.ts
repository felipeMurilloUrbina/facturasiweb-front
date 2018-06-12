import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, Request, RequestMethod, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../../../base';
import { DetalleCotizacion } from '../../../modelos/detalle-cotizacion.model';
import { Cotizacion } from '../../../modelos/cotizacion.model';
import { environment } from '../../../../environments/environment.prod';

@Injectable()
export class CotizacionService extends BaseService {

  constructor(public http: Http, public router: Router, toasterService: ToasterService) {
    super(router, http, environment.baseApiFacturacion, 'cotizaciones', toasterService);
  }
  public getCotizacion(id): Cotizacion {
    const cotizacion = new  Cotizacion();
    this.getId(id).subscribe(data => {
      const detalles = [...data.Detalles];
      console.log(data.Detalles);
      cotizacion.Id = data.Id;
      cotizacion.Cliente = data.Cliente;
      cotizacion.Folio  = data.Folio;
      cotizacion.Serie  = data.Serie;
      cotizacion.FormaPagoId  = data.FormaPagoId;
      cotizacion.MetodoPagoId  = data.MetodoPagoId;
      cotizacion.Observacion  = data.MetodoPagoId;
      cotizacion.Observacion  = data.Observacion;
      cotizacion.EsCredito = data.EsCredito;
      cotizacion.Detalles = [];
      cotizacion.Archivos = data.Archivos;
      detalles.forEach(element => {
        const detalle = new  DetalleCotizacion();
        detalle.Codigo = element.Codigo;
        detalle.CatalogoId =  element.CatalogoId === null ? 0 : element.CatalogoId;
        detalle.CatSatUnidad = element.UnidadId;
        detalle.CotizacionId = element.CotizacionId;
        detalle.Descripcion = element.Descripcion;
        detalle.Cantidad = element.Cantidad;
        detalle.Precio = element.Precio;
        detalle.TasaIva = element.TasaIva;
        detalle.TasaIeps = element.TasaIeps;
        detalle.TasaRetIsr = element.TasaRetIsr;
        detalle.TasaRetIva = element.TasaRetIva;
        cotizacion.Detalles.push(detalle);
        return cotizacion;
        // });
      });
    }, error => {
    });

    return cotizacion;
  }

  public upload() {

  }

}
