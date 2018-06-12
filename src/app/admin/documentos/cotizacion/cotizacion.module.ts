import { NgModule } from '@angular/core';
import { routingCotizacion } from './cotizacion-routing.module';
import {  CotizacionComponent, CreateCotizacionComponent } from '.';
import { AutoCompleteModule, SharedModule, ButtonModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
imports: [
  routingCotizacion,
  AutoCompleteModule,
  ButtonModule,    
  FormsModule,    
  ReactiveFormsModule,
  TableModule,
  SharedModule, 
  CommonModule, 
],
  declarations: [
    CotizacionComponent,
    CreateCotizacionComponent
  ]
})
export class CotizacionModule{}
