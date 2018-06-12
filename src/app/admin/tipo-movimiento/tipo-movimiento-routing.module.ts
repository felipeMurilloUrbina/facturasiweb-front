import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TipoMovimientoComponent, CreateTipoMovimientoComponent } from '.';
import { AuthGuard } from "../../base";
const routes: Routes = [
  { path: '', component: TipoMovimientoComponent },
  { path: 'nuevo', component: CreateTipoMovimientoComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateTipoMovimientoComponent, canActivate: [AuthGuard] },
];
export const routingTipoMovimiento: ModuleWithProviders = RouterModule.forChild(routes);