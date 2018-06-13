import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { contentHeaders, BaseService } from '../base';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
const BASEURL = environment.baseApiCatalogos;
declare var $: any;
@Injectable()
export class AppService extends BaseService {
  constructor(public http: Http, public router: Router, toasterService: ToasterService) {
    super(router, http,  environment.baseApiCatalogos, 'util', toasterService);
  }

  getPromesasUnidades(pagina: number, renglones: number) {
    // console.log(this.getUrl() + '/unidades/' + pagina + '/' + renglones);
    return this.http.get(this.getUrl() + '/unidades/' + pagina + '/' + renglones)
    .toPromise();
  }
  getPromesasCatalogos(pagina: number, renglones: number) {
    return this.http.get(this.getUrl() + '/catalogos/' + pagina + '/' + renglones)
    .toPromise();
  }

  getTodosPromesas(promesas) {
    const items = [];
    return Observable.forkJoin(promesas)
    .map(res => {
      res.forEach(data => {
        data.json().Elementos.forEach(element => {
          items.push(element);
        });
      });
      return items;
    });
  }
}
