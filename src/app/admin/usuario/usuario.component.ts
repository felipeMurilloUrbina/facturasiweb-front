import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { subscribeOn } from 'rxjs/operator/subscribeOn';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {

  usuarios: any[] = [];
  constructor(private _service: UsuarioService) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this._service.get().subscribe( data => {
      this.usuarios  = data;
    }, error => {
    });
  }

  cambiarEstatus(event, usuario) {
    usuario.Activo = event.checked;
    this._service.guardar(usuario, '').subscribe(data => {
      this.get();
    });
  }

}
