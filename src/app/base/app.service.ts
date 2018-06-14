import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/observable/forkJoin';
import { contentHeaders, BaseService } from '../base';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';
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
    const elementos = [];
    return Observable.forkJoin(promesas)
    .map((res: Response) => {
      if ( res.status === 200 ) {
       return res.json();
     } else {
     return false;
    }
    });
  }
}
