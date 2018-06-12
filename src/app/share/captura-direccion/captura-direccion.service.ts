import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, Request, RequestMethod, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../../base';
import { environment } from '../../../environments/environment';

@Injectable()
export class CapturaDireccionService  extends  BaseService {
  estados :string[];
  constructor(public http: Http, public router: Router, toasterService: ToasterService) {
    super(router, http, environment.baseApiConsultas, 'cliente', toasterService);
  }
  getEstados() {
    this.estados = [
      'Guerrero',
      'Baja California Sur',
      'Querétaro',
      'Durango',
      'Nuevo León',
      'Tabasco',
      'San Luis Potosí',
      'México',
      'Puebla',
      'Yucatán',
      'Veracruz de Ignacio de la Llave',
      'Michoacán de Ocampo',
      'Chiapas',
      'Quintana Roo',
      'Aguascalientes',
      'Nayarit',
      'Tlaxcala',
      'Jalisco',
      'Hidalgo',
      'Guanajuato',
      'Sonora',
      'Colima',
      'Oaxaca',
      'Zacatecas',
      'Chihuahua',
      'Sinaloa',
      'Morelos',
      'Baja California',
      'Coahuila de Zaragoza',
      'Ciudad de México',
      'Campeche',
      'Tamaulipas',
    ];
    return this.estados;
  } 


}
