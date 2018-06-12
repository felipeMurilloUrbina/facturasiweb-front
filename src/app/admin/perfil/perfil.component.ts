import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PerfilService } from './perfil.service';
import { JwtHelper } from 'angular2-jwt';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;
declare var $: any;
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [JwtHelper, PerfilService]
})
export class PerfilComponent implements OnInit {
  configForm: FormGroup;
  id: number;
  user: any;
  usuarioId = 0;
  usuarioConfig: any;
  nuevaContra = '';
  blockedDocument: Boolean = true;
  constructor( private fb: FormBuilder, private _jwtHelper: JwtHelper, private _service: PerfilService) {
    this.user = JSON.parse(this._jwtHelper.decodeToken(localStorage.getItem('token')).user);
  }
  ngOnInit() {
     // Update the AdminLTE layouts
    AdminLTE.init();
    this.get();
  }

  get() {
    this._service.activarEsperando();
    this._service.get().subscribe(data => {
      this.setForm(data);
     }, error => {
       this.setForm(undefined);
     }, () => {
       this._service.cerrarEsperando();
     });
  }

  setForm(usuario) {
    this.usuarioConfig = usuario;
    this.configForm = this.fb.group({
      Nombre: usuario ?  usuario.NombreCompleto : '',
      NombreUsuario:  usuario ? usuario.NombreUsuario : '',
      TimbresDisponibles: usuario ? usuario.TimbresDisponibles : 0,
      TimbresComprados: usuario ? usuario.TimbresComprados : 0,
      TimbresUsados: usuario ? usuario.TimbresUsados : 0,
      Asunto: usuario ? usuario.Asunto : '',
      Mensaje: usuario ? usuario.Mensaje : ''
      });
  }

  cambiarContra(usuario) {
    event.preventDefault();
     $('#modal-deactive-delete').modal({
        show: true,
        keyboard: false
    });
    $('.modal-backdrop').css('z-index', '-1');
  }

  cambiarPassword() {
    if (this.nuevaContra === '') {
      this._service.enviarMensaje('warning', 'Contraseña', 'Contraseña vacia');
      return false;
    }
    this._service.guardar(this.nuevaContra, '/password').subscribe(data => {
      this.procesoLimpiar(3);
    }, error => {
      console.log(error);
    });
   }

  guardar() {
    this.configForm.value.Id = this.user.Id;
    this._service.guardar(this.configForm.value, '').subscribe(data => {
      this.procesoLimpiar(1);
    }, error => {
      console.log(error);
      this.procesoLimpiar(2);
    });
  }

  procesoLimpiar(opcion) {
    switch (opcion) {
      case 1:
        this._service.enviarMensaje('success', 'Configuracion', 'Configuracion guardada correctamente');
      break;
      case 2:
        this._service.enviarMensaje('error', 'Configuracion', 'Error al guardar configuracion');
      break;
      case 3:
      this._service.enviarMensaje('success', 'Contraseña', 'Contraseña guardada correctamente');
    break;
    }
  }
}
