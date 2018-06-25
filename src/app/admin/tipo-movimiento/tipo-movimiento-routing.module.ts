import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../base";
import { CreateTipoMovimientoComponent } from "./create/create.component";
import { TipoMovimientoComponent } from "./tipo-movimiento.component";
const routes: Routes = [
  { path: '', component: TipoMovimientoComponent },
  { path: 'nuevo', component: CreateTipoMovimientoComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateTipoMovimientoComponent, canActivate: [AuthGuard] },
];
export const routingTipoMovimiento: ModuleWithProviders = RouterModule.forChild(routes);