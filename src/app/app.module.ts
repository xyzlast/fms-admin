import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AuthService, CodeService, TenantService } from './shared/services';

import { ROUTES } from './app.routes';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FeatureComponent } from './feature/feature.component';
import { MongoComponent } from './mongo/mongo.component';
import { ServerComponent } from './server/server.component';
import { UserComponent } from './user/user.component';
import { DeviceComponent } from './device/device.component';
import { TenantListComponent } from './shared/components/tenant-list/tenant-list.component';
import { TenantFeatureComponent } from './feature/tenant-feature/tenant-feature.component';
import { MongoStateComponent } from './mongo/mongo-state/mongo-state.component';

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
    TenantFeatureComponent,
    MongoStateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
  ],
  providers: [
    CodeService,
    TenantService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
