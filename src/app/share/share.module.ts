import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SharedModule, ButtonModule, DialogModule, DataTableModule, AutoCompleteModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaProductoComponent, ConsultaClienteComponent } from '.';
import { ModificacionProductoComponent } from './modificacion-producto';
import { CapturaIneComponent } from './capturar-ine';


@NgModule({
  imports: [
    ButtonModule,    
    FormsModule,    
    ReactiveFormsModule,
    TableModule,
    SharedModule,
    DataTableModule,
    AutoCompleteModule,
    DialogModule,
    CommonModule,           
  ],
  declarations: [
    ConsultaProductoComponent,
    ConsultaClienteComponent,
    ModificacionProductoComponent,
    CapturaIneComponent
  ],
  exports: [
    ConsultaProductoComponent,
    ConsultaClienteComponent,
    ModificacionProductoComponent,
    CapturaIneComponent
 ]
})
export class ShareModule {}