import { NgModule } from '@angular/core';
import { routingEquipo } from './equipo-routing.module';
import { EquipoComponent, CreateEquipoComponent } from '.';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    FormsModule,    
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    CommonModule,
    TableModule,
    routingEquipo],
  declarations: [
    EquipoComponent,
    CreateEquipoComponent
  ]
})
export class EquipoModule {}
