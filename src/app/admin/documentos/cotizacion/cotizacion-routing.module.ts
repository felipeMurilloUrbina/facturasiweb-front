import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../../base";
import { CotizacionComponent, CreateCotizacionComponent } from ".";
const routes: Routes = [
  { path: '', component: CotizacionComponent },
  { path: 'cotizaciones/nuevo', component: CreateCotizacionComponent, canActivate: [AuthGuard] },
  { path: 'cotizaciones/editar/:id', component: CreateCotizacionComponent, canActivate: [AuthGuard] },
];
export const routingCotizacion: ModuleWithProviders = RouterModule.forChild(routes);