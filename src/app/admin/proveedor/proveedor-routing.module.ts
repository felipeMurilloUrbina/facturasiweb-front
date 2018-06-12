import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ProveedorComponent, CreateProveedorComponent } from ".";
import { AuthGuard } from "../../base";
const routes: Routes = [
  { path: '', component: ProveedorComponent },
  { path: 'nuevo', component: CreateProveedorComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateProveedorComponent, canActivate: [AuthGuard] },
];
export const routingProveedor: ModuleWithProviders = RouterModule.forChild(routes);