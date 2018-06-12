import { NgModule } from '@angular/core';
import { routingUsuario } from './usuario-routing.module';
import { UsuarioComponent, CreateUsuarioComponent } from '.';
import { CommonModule } from '@angular/common';
import { SharedModule, ButtonModule, InputSwitchModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


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
