import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from '../reporte.service';
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-reporte-cliente',
  templateUrl: './reporte-cliente.component.html',
  styleUrls: ['./reporte-cliente.component.css'],
  providers: [ReporteService]
})
export class ReporteClienteComponent implements OnInit {
  clientes: any[]= [];
  clienteSeleccionado: any;
  visible = false;
  constructor(private _router: Router,private _service: ReporteService) { }
  ngOnInit() {
    this.get();
  }

  get() {
    this._service.getGenerico('clientes').subscribe(data => {
      $('#tabla').DataTable( {
        data: data,
        columns: [
          { data: 'Id', title: 'Codigo' },
          { data: 'Descripcion', title: 'Razon Social'},
          { data: 'Rfc', title: 'RFC' },
          { data: 'CodigoPostal', title: 'Codigo Postal'},
          { data: 'Ciudad', title: 'Ciudad'},
          { data: 'Estado', title: 'Estado'}
        ],
        language: {
            url: 'assets/js/Spanish.json'
          },
        dom: 'Bfrtip',
        buttons: [{
          extend: 'print',
          text: 'Imprimir Reporte'
        }]
    });
   this.clientes = data;

    }, error => {},
    () => {
      this._service.cerrarEsperando();
    });
  }
  regresar() {
    this.visible = false;
  }

  editar(cliente) {
    this._router.navigate(['/admin/clientes/editar', cliente.Id]);
  }

  eliminar(cliente) {
    this.clienteSeleccionado = cliente;
     $('#modal-deactive-delete').modal({
        show: true,
        keyboard: false
    });
    $('.modal-backdrop').css('z-index', '-1');
  }

  eliminarSuc() {
    this.clienteSeleccionado.Activo = false;
    this._service.actualizar(this.clienteSeleccionado, '/' + this.clienteSeleccionado.Id).subscribe(data => {
      this._service.enviarMensaje('success', 'Cliente', 'cliente eliminado correctamente');
      this.get();
    }, error => {
      this._service.enviarMensaje('error', 'Cliente', 'Error, al eliminar cliente');
      this.get();
    });
  }

}
