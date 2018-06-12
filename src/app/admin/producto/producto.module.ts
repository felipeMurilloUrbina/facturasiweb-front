import { NgModule } from '@angular/core';
import { routingProducto } from './producto-routing.module';
import { ProductoComponent, CreateProductoComponent } from ".";
import { SharedModule, ButtonModule, AutoCompleteModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    AutoCompleteModule,
    ButtonModule,    
    FormsModule,    
    ReactiveFormsModule,
    TableModule,
    SharedModule, 
    CommonModule, 
    routingProducto],
  declarations: [
    ProductoComponent,
    CreateProductoComponent
  ]
})
export class ProductoModule {}