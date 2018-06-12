import { NgModule } from '@angular/core';
import { routingDocumentos } from './documento-routing.module';
import {  FacturaComponent, CreateFacturaComponent, CotizacionComponent, CreateCotizacionComponent } from '.';
import { AutoCompleteModule } from 'primeng/primeng';


@NgModule({
imports: [routingDocumentos],
  declarations: [
    AutoCompleteModule,
    FacturaComponent,
    CreateFacturaComponent,
    CotizacionComponent,
    CreateCotizacionComponent
  ]
})
export class DocumentoModule {}
