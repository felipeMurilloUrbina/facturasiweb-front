import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SucursalComponent, CreateSucursalComponent } from ".";
import { AuthGuard } from "../../base";
const routes: Routes = [
  { path: '', component: SucursalComponent },
  { path: 'nuevo', component: CreateSucursalComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: CreateSucursalComponent, canActivate: [AuthGuard] },
];
export const routingSucursal: ModuleWithProviders = RouterModule.forChild(routes);