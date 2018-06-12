import { NgModule } from '@angular/core';
import { routingLinea } from './linea-routing.module';
import { LineaComponent, CreateLineaComponent } from ".";
import { CommonModule } from '@angular/common';
import { SharedModule, ButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ButtonModule,    
    FormsModule,    
    ReactiveFormsModule,
    TableModule,
    SharedModule, 
    CommonModule, 
    routingLinea],
  declarations: [
    LineaComponent,
    CreateLineaComponent
  ]
})
export class LineaModule {}
