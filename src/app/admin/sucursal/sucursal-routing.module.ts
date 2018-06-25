import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../base";
import { SucursalComponent } from "./sucursal.component";
import { CreateSucursalComponent } from "./create";
const routes: Routes = [
  { path: '', component: SucursalComponent },
  { path: 'nuevo', component: CreateSucursalComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateSucursalComponent, canActivate: [AuthGuard] },
];
export const routingSucursal: ModuleWithProviders = RouterModule.forChild(routes);