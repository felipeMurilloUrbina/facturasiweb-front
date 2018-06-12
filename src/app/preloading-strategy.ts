import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DexieService } from 'ngx-dexie';
import { AppService } from './base/app.service';

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
    let cantidad = 0;
    this._service.getGenerico('util/unidades/cantidad').subscribe(dato => {
      this._serviceDexi.count('unidades').then((resBD) => {
        console.log(resBD + '' + dato);
      })
    });
    //  this._service.addMultiple('unidades',)
    //  console.log(this._service.count('unidades'));
  }
}
