import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from '../base';
import { environment } from '../../environments/environment';
const BASEURL = environment.baseApiCatalogos + 'api/usuarios';
declare var $: any;
@Injectable()
export class LoginService {
  constructor (private _http: Http) {
    contentHeaders.delete('token');
  }

  login(Data): Observable<any> {
    const _data = JSON.stringify(Data);
    return this._http
    .post(
    BASEURL + '/login',
    _data,
    { headers : contentHeaders }).map( (res: Response) => {
      if ( res.status === 200 ) {
       return res.json();
     } else {
     return false;
    }
    });
  }

  private handleError(error: Response) {
  return Observable.throw(error.json().error || 'Server error');
  }

  activarEsperando() {
    // $('#' + contenedor).waitMe({
    $('.login-box-body').waitMe({
      effect: 'bounce',
      text: 'Cargando...',
      bg: 'rgba(255,255,255,0.3)',
      color: '#459e00',
      maxSize: '',
      waitTime: -1,
      source: '',
      textPos: 'vertical',
      fontSize: '',
      onClose: function() {}
      });
  }

  cerrarEsperando() {
    $('.login-box-body').waitMe('hide');
    // $('#' + contenedor).waitMe('hide');
  }
}
