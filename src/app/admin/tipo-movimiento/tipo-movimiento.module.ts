import { NgModule } from '@angular/core';
import { routingTipoMovimiento } from './tipo-movimiento-routing.module';
import { TipoMovimientoComponent, CreateTipoMovimientoComponent } from '.';
import { CommonModule } from '@angular/common';
import { SharedModule, ButtonModule, DialogModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    ButtonModule,    
    FormsModule,    
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    SharedModule, 
    CommonModule, 
    routingTipoMovimiento],
  declarations: [
    TipoMovimientoComponent,
    CreateTipoMovimientoComponent
  ]
})
export class TipoMovimientoModule {}
