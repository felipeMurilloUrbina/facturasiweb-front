import { NgModule } from '@angular/core';
import { routingUsuario } from './usuario-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule, ButtonModule, InputSwitchModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario.component';
import { CreateUsuarioComponent } from './create/create.component';


@NgModule({
  imports: [
    InputSwitchModule,
    ButtonModule,    
    FormsModule,    
    ReactiveFormsModule,
    TableModule,
    SharedModule, 
    CommonModule, 
    routingUsuario],
  declarations: [
    UsuarioComponent,
    CreateUsuarioComponent
  ]
})
export class UsuarioModule {}
