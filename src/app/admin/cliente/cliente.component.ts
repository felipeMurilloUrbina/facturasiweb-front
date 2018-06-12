import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from './cliente.service';
import { Usuario } from '../../modelos/usuario.model';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ClienteService]
})
export class ClienteComponent implements OnInit {
  clientes: any[]= [];
  clienteSeleccionado: any;
  usuario: Usuario;
  visible = false;
  cols: any[];
  height = '300px';
  constructor(private _router: Router, private _service: ClienteService) { }
  ngOnInit() {
    $('li').removeClass('active');
    $('#clientes').addClass('active');
    this.get();
    this.cols = [
      { field: 'Id', header: 'Codigo' },
      { field: 'Descripcion', header: 'Descripcion' },
      { field: 'Rfc', header: 'RFC' },
      { field: 'Calle', header: 'Calle' },
      { field: 'CodigoPostal', header: 'Codigo Postal' },
    ];
  }

  get() {
    this._service.activarEsperando();
    this._service.get().subscribe(data => {
      this.clientes = data;
      this._service.activarEsperando();
    }, error => {},
    () => {
      this._service.cerrarEsperando();
    });
  }

  asignarUsuario(cliente) {
    this.usuario = new Usuario();
    this.usuario.Nombre = cliente.Descripcion;
    this.usuario.Avatar = 'Default.png';
    this.visible = true;
  }

  guardarUsuario() {
    if ((this.usuario.NombreUsuario !== '') &&  (this.usuario.Contra !== '')) {
      this._service.guardar(this.usuario, '/usuario/registrar').subscribe(data => {
        console.log(data);
      });
    } else {
      this._service.enviarMensaje('warning', 'Error', 'Favor de rellenar los campos necesarios');
    }
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
    this._service.eliminar(this.clienteSeleccionado).subscribe(data => {
      this._service.enviarMensaje('success', 'Cliente', 'cliente eliminado correctamente');
      this.get();
    }, error => {
      this._service.enviarMensaje('error', 'Cliente', 'Error, al eliminar cliente');
      this.get();
    });
  }

}
