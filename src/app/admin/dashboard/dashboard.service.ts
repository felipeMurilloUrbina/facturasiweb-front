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
export class DashboardService  extends  BaseService {

  constructor(public http: Http, public router: Router, toasterService: ToasterService) {
    super(router, http, environment.baseApiReportes, 'reportes', toasterService);
  }

}
