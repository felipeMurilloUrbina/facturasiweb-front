import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from './headers';
import { environment } from '../../environments/environment';
const BASEURL = environment.baseApiConsultas + 'usuario';
@Injectable()
export class AuthService {

  constructor (private _http: Http) { 
    contentHeaders.delete('token');
    contentHeaders.append('token', localStorage.getItem('token'));
  }
  
  deleteLocalStorage() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    if(localStorage.getItem('token')) 
     return true;
    else
     return false;
  }

  logout(): Observable<any> {
  this.deleteLocalStorage();
    return this._http
    .post(
    BASEURL + '/logout',
    '',
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
}
