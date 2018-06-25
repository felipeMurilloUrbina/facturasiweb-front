import { NgModule } from '@angular/core';
import { routingProducto } from './producto-routing.module';
import { SharedModule, ButtonModule, AutoCompleteModule, InputSwitchModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto.component';
import { CreateProductoComponent } from './create/create.component';
@NgModule({
  imports: [
    AutoCompleteModule,
    ButtonModule,    
    FormsModule,    
    ReactiveFormsModule,
    TableModule,
    SharedModule,
    InputSwitchModule,
    CommonModule, 
    routingProducto],
  declarations: [
    ProductoComponent,
    CreateProductoComponent
  ]
})
export class ProductoModule {}