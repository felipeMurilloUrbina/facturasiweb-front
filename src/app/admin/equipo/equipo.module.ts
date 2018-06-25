import { NgModule } from '@angular/core';
import { routingEquipo } from './equipo-routing.module';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CreateEquipoComponent } from './create';
import { EquipoComponent } from './equipo.component';

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
