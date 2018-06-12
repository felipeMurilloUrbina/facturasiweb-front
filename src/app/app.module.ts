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
import { ConsultaProductoComponent, ConsultaClienteComponent, ConsultaTipoVentaComponent } from './share';
import { ShareModule } from './share/share.module';
import { MenuComponent, PiePaginaComponent, ContenidoComponent, EncabezadoComponent, AdminAppComponent } from './estructura-pagina';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    HttpModule,
    ButtonModule,
    BrowserModule,
    FormsModule,
    GrowlModule,
    PanelMenuModule,
    DialogModule,
    DataTableModule,
    PanelModule,
    SharedModule,
    ToasterModule,
    TableModule,    
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
