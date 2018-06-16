import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from '../producto.service';
import { Producto } from '../../../modelos/producto.model';
import { DexieService } from 'ngx-dexie';
declare var $: any;
@Component({
  selector: 'app-create-producto',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProductoService, DexieService]
})
export class CreateProductoComponent implements OnInit {
  id: number;
  unidades: any[];
  lineas: any[];
  codigos: any[];
  display: Boolean = false;
  filtroResultados: string[] = [];
  producto: Producto;
  esLocalizacion = false;
  esCostos = false;
  titulo = 'Nuevo Producto';
  constructor(private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder, private _service: ProductoService, private _serviceDexie: DexieService) {
    this.producto = new Producto();
  }

  ngOnInit() {
    this._serviceDexie.toCollection('unidades').toArray().then((unidades) => {
      this.unidades =  unidades;
    });
    this._serviceDexie.toCollection('catalogoSat').toArray().then((codigos) => {
      this.codigos =  codigos;
    });
    this._service.activarEsperando();
    this._route.params
    .subscribe(params => {
      this.id = params['id'];
      this.getProducto(this.id);
    });
  }

  getCatalogoSat(busqueda) {
      this._service.getGenerico('util/catalogos/' + busqueda).subscribe(data => {
        this.filtroResultados = data;
      }, Error => {
      });
  }

  getProducto(id: number) {
    if (id) {
      this._service.getGenerico('productos/' + id).subscribe(data => {
        this.setForm(data);
      }, Error => {
        console.log(Error);
      });
    } else {
      this.producto = new Producto();
      this._service.cerrarEsperando();
    }
  }

  irConsultar() {
    this.display = true;
  }

  setForm(producto) {
    this.producto = producto;
    this._service.cerrarEsperando();
  }

  buscarCodigo(event) {
    this._service.getGenerico('util/catalogos/' + event.query).subscribe(data => {
      this.filtroResultados = data;
    }, Error => {
    });
  }

  buscarUnidad(event) {
    this.filtroResultados = this.unidades.filter(u => u.Descripcion.toLowerCase() === <string>event.query.toLowerCase());
    if (this.filtroResultados.length === 0)
    {
      this.filtroResultados = this.unidades.filter(p => p.Descripcion.toLowerCase().indexOf(event.query.toLowerCase()) > -1);
    }
    if (this.filtroResultados.length === 0) {
      this.filtroResultados = this.unidades.filter(p => p.Codigo.toLowerCase().indexOf(event.query.toLowerCase()) > -1);
    }
  }

  guardar() {
    this.producto.CatalogoId = this.producto.CatalogoSat ? this.producto.CatalogoSat.Id : 0;
    this.producto.UnidadId = this.producto.CatSatUnidad ? this.producto.CatSatUnidad.Id : 0;
    this.producto.CatSatUnidad = undefined;
    this.producto.CatalogoSat = undefined;
    this._service.guardar(this.producto, '').subscribe(data => {
      this.procesoLimpiar(1, data);
      this.regresar();
    }, error => {
      this.procesoLimpiar(2, JSON.parse(error._body).Message);
      this.regresar();
    });
  }

  procesoLimpiar(opcion, mensaje) {
    switch (opcion) {
      case 1:
        this._service.enviarMensaje('success', 'Productos', mensaje);
      break;
      case 2:
        this._service.enviarMensaje('error', 'Productos', mensaje);
      break;
    }
  }

  regresar() {
    setTimeout(() => {
      this._router.navigate(['/admin/productos'], { queryParams: {} });
    }, 600);

  }
}
