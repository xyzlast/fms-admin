/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FeatureComponent } from './feature/feature.component';
import { MongoComponent } from './mongo/mongo.component';
import { ServerComponent } from './server/server.component';
import { UserComponent } from './user/user.component';
import { DeviceComponent } from './device/device.component';
import { TenantListComponent } from './shared/components/tenant-list/tenant-list.component';
import { TenantFeatureComponent } from './feature/tenant-feature/tenant-feature.component';

import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CodeService, AuthService, TenantService } from './shared/services';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './app.routes';

describe('App: FmsAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
        RouterOutlet,
        RouterLink,
        RouterLinkActive
      ],
      imports: [
        FormsModule,
        HttpModule,
        // RouterModule.forRoot(ROUTES, { useHash: true }),
      ],
      providers: [
        CodeService,
        AuthService,
        TenantService
      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
