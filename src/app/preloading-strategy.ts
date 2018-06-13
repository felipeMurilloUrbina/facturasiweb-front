import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DexieService } from 'ngx-dexie';
import { AppService } from './base/app.service';
import "rxjs/add/operator/takeWhile";
import { delay } from 'rxjs/operators';
@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preloadedModules: string[] = [];
  constructor(private _service: AppService, private _serviceDexi: DexieService ) {
    this.preloadDatabase();
  }
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      this.preloadedModules.push(route.path);
      return load();
    } else {
      return Observable.of(null);
    }
  }

  preloadDatabase() {
    let datos = [];
    let pagina = 1;
    this._service.getGenerico('util/unidades/cantidad').subscribe(dato => {
      this._serviceDexi.count('unidades').then((resBD) => {
        if(dato !== resBD) {
          //this._serviceDexi.clearAll('unidades');
          while(datos.length != dato) {
            this._service.getGenerico('util/unidades/' + pagina + '/250')
              .subscribe(respuesta =>{
              console.log(respuesta);
              datos.push(respuesta.Elementos);
              pagina++;
            });
            delay(13000);
            console.log(datos.length != dato);
            console.log(datos);
          }
          console.log(datos);
         }
      })
    });
  }
}