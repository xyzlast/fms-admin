import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';

import { AuthService } from './shared/services';
import { MenuComponent } from './menu/menu.component';
import { FeatureComponent } from './feature/feature.component';
import { MongoComponent } from './mongo/mongo.component';
import { ServerComponent } from './server/server.component';
import { UserComponent } from './user/user.component';
import { DeviceComponent } from './device/device.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FeatureComponent,
    MongoComponent,
    ServerComponent,
    UserComponent,
    DeviceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
