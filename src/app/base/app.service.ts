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
const BASEURL = environment.baseApiCatalogos;
declare var $: any;
@Injectable()
export class AppService extends BaseService {
  constructor(public http: Http, public router: Router, toasterService: ToasterService) {
    super(router, http,  environment.baseApiCatalogos, 'util', toasterService);
  }
}
