import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, Request, RequestMethod, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Subscription, Observable } from 'rxjs';
import { ToasterService } from 'angular2-toaster';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { contentHeaders } from './headers';
import { environment } from '../../environments/environment';
import {MessageService} from 'primeng/components/common/messageservice';
declare var $: any;
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
@Injectable()
export class BaseService {
  private toasterService: ToasterService;
  public baseUrl = '';
  private messageService: MessageService;
  public options: RequestOptions = new RequestOptions({
      url: this.baseUrl,
      method: RequestMethod.Get,
      headers: contentHeaders,
  });
  constructor (
    public  _router: Router,
    public _http: Http,
    public _baseUri: string,
    public modulo: string,
    toasterService: ToasterService) {
    this.baseUrl = _baseUri + 'api/';
    contentHeaders.delete('token');
    contentHeaders.append('token', localStorage.getItem('token'));
    contentHeaders.delete('sucursal');
    contentHeaders.append('sucursal', localStorage.getItem('sucursal'));
    this.options.headers = contentHeaders;
    this.options.url = this.baseUrl + modulo;
    this.toasterService = toasterService;
    this.messageService  = new MessageService();
  }

  getId(id: number): Observable<any> {
    this.options.url = this.baseUrl + this.modulo + '/' + id;
    this.options.method = RequestMethod.Get;
    const request = new Request(this.options);
    return this.makeRequest(request);
  }

  get(): Observable<any> {
    this.options.url = this.baseUrl + this.modulo;
    this.options.method = RequestMethod.Get;
    const request = new Request(this.options);
    return this.makeRequest(request);
  }

  getUrlAbsoluta(): string {
    return   environment.baseApiConsultas + 'avatars/';
  }

  getUrl(): string {
    return  this.baseUrl + this.modulo;
  }

  getGenerico(url: string): Observable<any> {
    this.options.url = this.baseUrl + url;
    this.options.method = RequestMethod.Get;
    const request = new Request(this.options);
    return this.makeRequest(request);
  }

  postGenerico(data, url: string): Observable<any> {
    const _data = JSON.stringify(data);
    this.options.url = this.baseUrl + url;
    this.options.body = _data;
    this.options.method = RequestMethod.Post;
    const request = new Request(this.options);
    return this.makeRequest(request);
  }

  guardar(Data, action): Observable<any> {
    const _data = JSON.stringify(Data);
    if (Data.Id) {
      return this.actualizar(_data, action);
    }else {
      return this.agregar(_data, action);
    }
  }

  protected agregar(_data, action) {
    this.options.url = this.baseUrl + this.modulo + action;
    this.options.body = _data;
    this.options.method = RequestMethod.Post;
    const request = new Request(this.options);
    return this.makeRequest(request);
  }

  eliminar(_data) {
    this.options.body = _data;
    this.options.method = RequestMethod.Delete;
    const request = new Request(this.options);
    return this.makeRequest(request);
  }

  actualizar(_data, action) {
    this.options.url = this.baseUrl + this.modulo + action;
    this.options.body = _data;
    this.options.method = RequestMethod.Put;
    const request = new Request(this.options);
    return this.makeRequest(request);
  }

  sinPermisos(): Observable<any> {
    this._router.navigate(['/error']);
    return Observable.empty();
  }

  forbidden(): Observable<any> {
    this._router.navigate(['/']);
    return Observable.empty();
  }

  onError(): Observable<any> {
    this._router.navigate(['/error']);
    return Observable.empty();
  }

  makeRequest(request: Request) {
    this.activarEsperando();
    return this.intercept(this._http.request(request).map(res => {
      this.cerrarEsperando();
      return  res.json();
    }
    ));
  }

  intercept(observable: Observable<any>) {
    
    console.log(observable);
    return observable.catch(error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          return Observable.of(error);
        }
      }
      this.cerrarEsperando();
      // if (error.status === 0 ) {
      //   // this.enviarMensaje('error',  'Error', 'Error, con el servicio de datos');
      //   // this._router.navigate(['/login']);
      // } else if (err.status === 401) {
      //   return this.sinPermisos();
      // } else if (err.status === 403) {
      //   return this.forbidden();
      // } else {
      //   return Observable.throw(err);
      // }
    });
  }

  enviarMensaje(opcion, titulo, mensaje) {
    this.toasterService.pop(opcion, titulo, mensaje);
  }

  
  resolveFieldData(data: any, field: string): any {
    if (data && field) {
      if (field.indexOf('.') === -1) {
        return data[field];
      } else {
        const fields: string[] = field.split('.');
        let value = data;
        for (let i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  }
  
  activarEsperando() {
  $(document).ready(() => {
    $('body').waitMe({
      effect: 'bounce',
      text: 'Cargando...',
      bg: 'rgba(255,255,255,0.6)',
      color: '#007bff',
      maxSize: '',
      waitTime: -1,
      source: '',
      textPos: 'vertical',
      fontSize: '18',
      onClose: function() {}
    });
  });
  }
  cerrarEsperando() {
    $(document).ready(() => {
      $('body').waitMe('hide');
    });
  }
}
