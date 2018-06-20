import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthGuard } from './base';
import { LoginComponent } from './login';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { GrowlModule, PanelMenuModule, PanelModule, DialogModule, DataTableModule, ButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { DexieModule} from 'ngx-dexie';
import { configDexie } from './dexie-config';
import { AppService } from './base/app.service';
import { GrowlModule, DataTableModule, SharedModule, FileUpload, DialogModule, FileUploadModule } from 'primeng/primeng';
import { ConsultaArchivoComponent } from './share';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConsultaArchivoComponent
  ],
  imports: [
    HttpModule,
    GrowlModule,
    BrowserModule,
    DataTableModule,
    FileUploadModule,
    DialogModule,
    CommonModule, 
    SharedModule,
    DexieModule.forRoot(configDexie),
    FormsModule,
    ToasterModule.forRoot(),
    TableModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ToasterService, AppService, AuthGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
