import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../modelos/usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [UsuarioService]
})
export class CreateUsuarioComponent implements OnInit {
  usuario: Usuario;
  titulo = 'Nuevo Usuario';

  constructor(private _service: UsuarioService) {
    this.usuario = new  Usuario();
   }

  ngOnInit() {
  }

  guardar() {
    this._service.guardar(this.usuario, '').subscribe( data => {
      this._service.enviarMensaje('success', 'Usuarios', data);
    }, error => {
      this._service.enviarMensaje('success', 'Usuarios', JSON.parse(error._body).Message);
    });
  }

}
