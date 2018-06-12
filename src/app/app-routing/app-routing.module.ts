import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login';
import { CustomPreloadingStrategy } from '../preloading-strategy';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: '../admin/admin.module#AdminModule' },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
    exports: [ RouterModule],
    providers: [CustomPreloadingStrategy],
})
export class AppRoutingModule { }
