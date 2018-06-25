import { NgModule } from '@angular/core';
import { routingProveedor } from './proveedor-routing.module';
import { SharedModule, ButtonModule, AutoCompleteModule, DialogModule, DataTableModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProveedorComponent } from './proveedor.component';
import { CreateProveedorComponent } from './create/create.component';


@NgModule({
  imports: [
    AutoCompleteModule,
    ButtonModule,
    DialogModule,   
    FormsModule,    
    ReactiveFormsModule,
    TableModule,
    DataTableModule,
    SharedModule, 
    CommonModule, 
    routingProveedor],
  declarations: [
    ProveedorComponent,
    CreateProveedorComponent
  ]
})
export class ProveedorModule {}
