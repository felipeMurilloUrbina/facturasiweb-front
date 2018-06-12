import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../../base";
import { FacturaComponent, CreateFacturaComponent } from ".";
const routes: Routes = [
  { path: '', component: FacturaComponent },
  { path: 'nuevo', component: CreateFacturaComponent, canActivate: [AuthGuard] },
];
export const routingFactura: ModuleWithProviders = RouterModule.forChild(routes);