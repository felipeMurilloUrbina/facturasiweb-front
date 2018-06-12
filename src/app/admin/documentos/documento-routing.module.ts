import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../base";
import { FacturaComponent, CotizacionComponent, CreateFacturaComponent, CreateCotizacionComponent } from ".";
const routes: Routes = [
  { path: '', component: FacturaComponent },
  { path: 'facturas', component: FacturaComponent, canActivate: [AuthGuard] },
  { path: 'cotizaciones', component: CotizacionComponent, canActivate: [AuthGuard] },
  { path: 'facturas/nuevo', component: CreateFacturaComponent, canActivate: [AuthGuard] },
  { path: 'facturas/nuevo/:servicioId', component: CreateFacturaComponent, canActivate: [AuthGuard] },
  { path: 'cotizaciones/nuevo', component: CreateCotizacionComponent, canActivate: [AuthGuard] },
  { path: 'cotizaciones/editar/:id', component: CreateCotizacionComponent, canActivate: [AuthGuard] },
];
export const routingDocumentos: ModuleWithProviders = RouterModule.forChild(routes);