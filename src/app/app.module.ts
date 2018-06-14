import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ToNumberPipe, AuthGuard } from './base';
import { LoginComponent } from './login';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrowlModule, PanelMenuModule, SharedModule, PanelModule, DialogModule, DataTableModule, ButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { DexieModule} from 'ngx-dexie';
import { configDexie } from './dexie-config';
import { AppService } from './base/app.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    HttpModule,
    ButtonModule,
    BrowserModule,
    DexieModule.forRoot(configDexie),
    FormsModule,
    GrowlModule,
    PanelMenuModule,
    DialogModule,
    DataTableModule,
    PanelModule,
    ToasterModule,
    TableModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AppService, AuthGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
