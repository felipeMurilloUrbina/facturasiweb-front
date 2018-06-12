import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { routingDashboard } from './dashboard-routing.module';
import { ChartModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    routingDashboard,
    CommonModule,
    ChartModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {}
