import { NgModule } from '@angular/core';
import { routingAlmacen } from './almacen-routing.module';
import { AlmacenComponent, CreateAlmacenComponent } from '.';
import { TableModule } from 'primeng/table';
import { SharedModule, ButtonModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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