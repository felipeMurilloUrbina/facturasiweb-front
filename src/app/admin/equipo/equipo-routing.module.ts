import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../base";
import { CreateEquipoComponent } from "./create";
import { EquipoComponent } from "./equipo.component";
const routes: Routes = [
  { path: '', component: EquipoComponent },
  { path: 'nuevo', component: CreateEquipoComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateEquipoComponent, canActivate: [AuthGuard] },
];
export const routingEquipo: ModuleWithProviders = RouterModule.forChild(routes);