import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ServicioComponent, CreateServicioComponent } from ".";
import { AuthGuard } from "../../base";
const routes: Routes = [
  { path: '', component: ServicioComponent },
  { path: 'nuevo', component: CreateServicioComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateServicioComponent, canActivate: [AuthGuard] },
];
export const routingServicio: ModuleWithProviders = RouterModule.forChild(routes);