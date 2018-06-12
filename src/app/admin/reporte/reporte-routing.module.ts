import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../base";
import { ReporteClienteComponent, ReporteEquipoComponent, ReporteFacturaComponent,
         ReporteProductoComponent, ReporteServicioComponent } from ".";
const routes: Routes = [
  { path: '', component: ReporteClienteComponent },
  { path: 'clientes', component: ReporteClienteComponent, canActivate: [AuthGuard] },
  { path: 'equipos', component: ReporteEquipoComponent, canActivate: [AuthGuard] },
  { path: 'facturas', component: ReporteFacturaComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ReporteProductoComponent, canActivate: [AuthGuard] },
  { path: 'servicios', component: ReporteServicioComponent, canActivate: [AuthGuard] },
];
export const routingReporte: ModuleWithProviders = RouterModule.forChild(routes);