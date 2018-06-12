import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from './producto.service';
declare var AdminLTE: any;
declare var $: any;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ProductoService]
})
export class ProductoComponent implements OnInit {
  productos: any[]= [];
  productoSeleccionado: any;
  cols: any[];
  height = '300px';
  constructor(private _router: Router, private _service: ProductoService) { }
  ngOnInit() {
    $('li').removeClass('active');
    $('#productos').addClass('active');
    this.cols = [
      { field: 'CatalogoSat.Codigo', header: 'Codigo SAT' },
      { field: 'Codigo', header: 'Codigo' },
      { field: 'Descripcion', header: 'Descripcion' },
      { field: 'Precio', header: 'Precio' },
      { field: 'TasaIvaMostrar', header: 'Iva' }
    ];
    this.get();
  }

  get() {
    this._service.activarEsperando();
    this._service.get().subscribe(data => {
      this.productos = data;
    }, error => {

    }, () => {
      this._service.cerrarEsperando();
    });
  }

  eliminar() {
    this.productoSeleccionado.Activo = false;
    this._service.eliminar(this.productoSeleccionado).subscribe(data => {
      this._service.enviarMensaje('success', 'Producto', 'Producto eliminado correctamente');
      this.get();
    }, error => {
      this._service.enviarMensaje('error', 'Producto', 'Error, al eliminar producto');
      this.get();
    });
  }

  mostrarEliminar(producto) {
    this.productoSeleccionado = producto;
     $('#modal-deactive-delete').modal({
        show: true,
        keyboard: false
    });
    $('.modal-backdrop').css('z-index', '-1');
  }

  editar(producto) {
    this._router.navigate(['admin/productos/editar', producto.Id]);
  }
}
