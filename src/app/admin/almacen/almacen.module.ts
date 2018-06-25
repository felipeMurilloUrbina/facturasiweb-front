import { NgModule } from '@angular/core';
import { routingAlmacen } from './almacen-routing.module';
import { TableModule } from 'primeng/table';
import { SharedModule, ButtonModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlmacenComponent } from './almacen.component';
import { CreateAlmacenComponent } from './create';


@NgModule({
  imports: [
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    SharedModule,
    CommonModule,
    routingAlmacen
  ],
  declarations: [
    AlmacenComponent,
    CreateAlmacenComponent
  ]
})
export class AlmacenModule {}