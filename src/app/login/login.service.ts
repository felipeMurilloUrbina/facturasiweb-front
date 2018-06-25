import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { contentHeaders, BaseService } from '../base';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { MessageService } from 'primeng/components/common/messageservice';
const BASEURL = environment.baseApiCatalogos + 'api/usuarios';
declare var $: any;
@Injectable()
export class LoginService extends BaseService {
  constructor(public http: Http, public router: Router, toasterService: ToasterService) {
    super(router, http,  environment.baseApiCatalogos, 'usuarios', toasterService);
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

  // cerrarEsperando() {
  //   $('.login-box-body').waitMe('hide');
  //   // $('#' + contenedor).waitMe('hide');
  // }
}
