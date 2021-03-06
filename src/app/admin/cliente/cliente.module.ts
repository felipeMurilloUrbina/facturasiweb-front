import { NgModule } from '@angular/core';
import { routingCliente } from './cliente-routing.module';
import { ClienteComponent, CreateClienteComponent } from '.';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, SharedModule, AutoCompleteModule, DialogModule, DataTableModule, DropdownModule } from 'primeng/primeng';
import { TablaFacturaComponent } from '../documentos';
import { BrowserModule } from '@angular/platform-browser';
import { ClienteTablaServicioComponent } from '../../cliente';
import { FacturaModule } from '../documentos/factura/factura.module';


@NgModule({
  imports: [
    AutoCompleteModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    FormsModule,    
    ReactiveFormsModule,
    TableModule,
    DataTableModule,
    FacturaModule,
    SharedModule,
    CommonModule, 
    routingCliente],
  declarations: [
    ClienteComponent,
    ClienteTablaServicioComponent,
    CreateClienteComponent
  ]
})
export class ClienteModule {}
