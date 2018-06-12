import { NgModule } from '@angular/core';
import { routingReporte } from './reporte-routing.module';
import { ReporteClienteComponent, ReporteEquipoComponent, ReporteFacturaComponent,
  ReporteProductoComponent, ReporteServicioComponent } from ".";


@NgModule({
  imports: [routingReporte],
  declarations: [
    ReporteClienteComponent,
    ReporteEquipoComponent,
    ReporteFacturaComponent,
    ReporteServicioComponent,
    ReporteProductoComponent
  ]
})
export class ReporteModule {}
