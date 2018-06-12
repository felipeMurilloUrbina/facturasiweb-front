import { NgModule } from '@angular/core';
import { routingEquipo } from './equipo-routing.module';
import { EquipoComponent, CreateEquipoComponent } from '.';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TablaServicioComponent } from '../servicio';


@NgModule({
  imports: [
    DataTableModule,
    FormsModule,    
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    routingEquipo],
  declarations: [
    EquipoComponent,
    CreateEquipoComponent,
    TablaServicioComponent
  ]
})
export class EquipoModule {}
