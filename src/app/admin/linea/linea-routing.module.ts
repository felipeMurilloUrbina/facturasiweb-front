import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../base";
import { LineaComponent } from "./linea.component";
import { CreateLineaComponent } from "./create";
const routes: Routes = [
  { path: '', component: LineaComponent },
  { path: 'nuevo', component: CreateLineaComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateLineaComponent, canActivate: [AuthGuard] },
];
export const routingLinea: ModuleWithProviders = RouterModule.forChild(routes);