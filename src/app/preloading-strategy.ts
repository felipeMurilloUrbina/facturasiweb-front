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
    let cantidadRenglones = 1000;
    let paginas = 0;
    let promesasUnidades = [];
    let promesasCatalogo = [];
    // this._serviceDexi.clearAll('catalogoSat');
    // this._serviceDexi.clearAll('unidades');

    this._service.getGenerico('util/unidades/cantidad').subscribe(cantidad => {
      this._serviceDexi.count('unidades').then((cantidadBD) => {
        if (cantidad !== cantidadBD) {
          paginas = cantidad / cantidadRenglones;
          this._serviceDexi.clearAll('unidades');
          for (let i = 1; i <= paginas + 1; i++) {
            promesasUnidades.push(this._service.getPromesasUnidades(i, cantidadRenglones));
          }
          this._service.getTodosPromesas(promesasUnidades).subscribe(areglo => {
            this._serviceDexi.addMultiple('unidades', areglo);
          });
        }
      });
    });
    this._service.getGenerico('util/catalogos/cantidad').subscribe(cantidad => {
      this._serviceDexi.count('catalogoSat').then((cantidadBD) => {
        if (cantidad !== cantidadBD) {
          paginas = cantidad / cantidadRenglones;
          this._serviceDexi.clearAll('catalogoSat');
          for (let i = 1; i <= paginas + 1; i++) {
            promesasCatalogo.push(this._service.getPromesasCatalogos(i, cantidadRenglones));
          }
          this._service.getTodosPromesas(promesasCatalogo).subscribe(areglo => {
            this._serviceDexi.addMultiple('catalogoSat', areglo);
          });
        }
      });
    }, error => {
      console.log(error);
    });
  }
}
