import { NgModule } from '@angular/core';
import { routingServicio } from './servicio-routing.module';
import { ServicioComponent, CreateServicioComponent, TablaServicioComponent } from '.';
import { CommonModule } from '@angular/common';
import { SharedModule, ButtonModule, DialogModule, DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    ButtonModule,    
    DialogModule,
    DataTableModule,
    FormsModule,    
    ReactiveFormsModule,
    TableModule,

    SharedModule, 
    CommonModule, 
    routingServicio],
  declarations: [
    ServicioComponent,
    CreateServicioComponent,
    TablaServicioComponent
  ]
})
export class ServicioModule {}
