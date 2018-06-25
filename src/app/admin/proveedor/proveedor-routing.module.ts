import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../base";
import { CreateProveedorComponent } from "./create/create.component";
import { ProveedorComponent } from "./proveedor.component";
const routes: Routes = [
  { path: '', component: ProveedorComponent },
  { path: 'nuevo', component: CreateProveedorComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateProveedorComponent, canActivate: [AuthGuard] },
];
export const routingProveedor: ModuleWithProviders = RouterModule.forChild(routes);