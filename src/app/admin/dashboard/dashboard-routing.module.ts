import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../base";
import { DashboardComponent } from "./dashboard.component";
const routes: Routes = [
  { path: '', component: DashboardComponent },
];
export const routingDashboard: ModuleWithProviders = RouterModule.forChild(routes);