import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { EquipoComponent, CreateEquipoComponent } from ".";
import { AuthGuard } from "../../base";
const routes: Routes = [
  { path: '', component: EquipoComponent },
  { path: 'nuevo', component: CreateEquipoComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateEquipoComponent, canActivate: [AuthGuard] },
];
export const routingEquipo: ModuleWithProviders = RouterModule.forChild(routes);