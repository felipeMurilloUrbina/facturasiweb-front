import { NgModule } from '@angular/core';
import { routingTipoMovimiento } from './tipo-movimiento-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule, ButtonModule, DialogModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoMovimientoComponent } from './tipo-movimiento.component';
import { CreateTipoMovimientoComponent } from './create/create.component';


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
