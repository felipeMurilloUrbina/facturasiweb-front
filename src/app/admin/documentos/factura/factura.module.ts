import { NgModule } from '@angular/core';
import { routingFactura } from './factura-routing.module';
import {  FacturaComponent, CreateFacturaComponent, TablaFacturaComponent } from '.';
import { AutoCompleteModule, ButtonModule, MultiSelectModule, SharedModule, DialogModule, DataTableModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ConsultaClienteComponent, ConsultaProductoComponent } from '../../../share';
import { CapturaIneComponent } from '../../../share/capturar-ine';
import { ModificacionProductoComponent } from '../../../share/modificacion-producto';
import { ShareModule } from '../../../share/share.module';


@NgModule({
imports: [
  AutoCompleteModule,
  ButtonModule,
  DialogModule,
  FormsModule,    
  ReactiveFormsModule,
  MultiSelectModule,
  TableModule,
  DataTableModule,
  SharedModule,
  ShareModule,
  CommonModule, 
  routingFactura
],
  declarations: [
    TablaFacturaComponent,
    FacturaComponent,
    CreateFacturaComponent,
  ],
  exports: [TablaFacturaComponent]
})
export class FacturaModule{}
