import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { LoginService } from './login.service';
import { Usuario } from '../modelos/usuario.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  msgs: Message[] = [];
  loadingVisible = false;
  loadIndicatorVisible = false;
  tituloBoton = 'Entrar';
  titulo: String = 'Iniciar Sesion';
  sucursales = [];
  sucursalId = '';
  isBlocked =  false;
  usuario: Usuario;
  constructor(private router: Router, private _fb: FormBuilder, private _service: LoginService) {
    localStorage.removeItem('token');
}

  ngOnInit() {
    this._service.cerrarEsperando();
    this.usuario = new Usuario();
    this.sucursales.length
  }

  showMessage(option, title, message) {
    switch (option) {
      case 1:
        this.msgs.push({severity: 'success', summary: title, detail: message});
      break;
      case 2:
        this.msgs.push({severity: 'error', summary: title, detail: message});
      break;
      case 3:
        this.msgs.push({severity: 'warn', summary: title, detail: message});
      break;
    }
  }

  cambiarEstadoBoton(texto: string, bandera: boolean) {
    this.loadIndicatorVisible = bandera;
    this.loadingVisible = bandera;
  }

  keydown(event) {
    if (event === 13) {
      this.login();
    }
   }

  login() {
    if (this.sucursales.length > 0) {
      localStorage.setItem('sucursal', this.usuario.SucursalId.toString());
      this.router.navigate(['/admin']);
    }
    // Valida si la contraseña esta vacia.
    if ((!this.usuario.Contra) || (this.usuario.Contra === '')) {
      $('#msg-contra').addClass('alert-validate');
      return false;
    }
    this._service.activarEsperando();
    this._service.postGenerico(this.usuario, '/usuarios/login').subscribe(data => {
      this.isBlocked  = true;
      this.sucursales = data.Sucursales;
      localStorage.setItem('sucursales',  JSON.stringify(this.sucursales));
      localStorage.setItem('token',  data.Token);
      this.tituloBoton = 'Seleccione Empresa';
      this._service.cerrarEsperando();
    }, error => {
      if (!error._body.isTrusted) {
        let er = eval('(' + error._body + ')');
        if (er) {
          this.showMessage(2, 'error', er.Message);
        } else {
          this.showMessage(2, 'Error', 'Error, al conectar con la base de datos.');
        }
      } else {
        this.showMessage(2, 'Error', 'Error, al conectar con la base de datos.');
      }
      this._service.cerrarEsperando();
    }, () => {
    });
  }

}
