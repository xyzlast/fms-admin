import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// NOTE: KENDO UI
import { ButtonsModule } from '@progress/kendo-angular-buttons/dist/npm/js/main';
import { GridModule } from '@progress/kendo-angular-grid/dist/npm/js/main';
import { DialogModule } from '@progress/kendo-angular-dialog/dist/npm/js/main';

import { ModalModule } from "ng2-modal";

import { AppComponent } from './app.component';

import { AuthService, CodeService, TenantService } from './shared/services';
import { Broadcaster } from './shared/utils';

import { ROUTES } from './app.routes';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { ServerComponent } from './server/server.component';

import { TenantListComponent } from './shared/components/tenant-list/tenant-list.component';
import { TenantComponent } from './tenant/tenant.component';
import { FeatureComponent } from './tenant/feature/feature.component';
import { MongoComponent } from './tenant/mongo/mongo.component';
import { DeviceComponent } from './tenant/device/device.component';
import { UserComponent } from './tenant/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FeatureComponent,
    MongoComponent,
    ServerComponent,
    UserComponent,
    DeviceComponent,
    TenantListComponent,
    TenantComponent,
    FeatureComponent,
    MongoComponent,
    DeviceComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    ButtonsModule,
    GridModule,
    FormsModule,
    HttpModule,
    DialogModule,
    ModalModule,
    // RouterModule.forRoot(ROUTES, { useHash: true }),
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    Broadcaster,
    CodeService,
    TenantService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
