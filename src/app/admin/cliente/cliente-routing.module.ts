import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent, CreateClienteComponent } from ".";
import { AuthGuard } from "../../base";
const routes: Routes = [
  { path: '', component: ClienteComponent },
  { path: 'nuevo', component: CreateClienteComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateClienteComponent, canActivate: [AuthGuard] },
];
export const routingCliente: ModuleWithProviders = RouterModule.forChild(routes);