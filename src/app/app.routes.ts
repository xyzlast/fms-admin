import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ServerComponent } from './server/server.component';

import { TenantComponent } from './tenant/tenant.component';
import { FeatureComponent } from './tenant/feature/feature.component';
import { MongoComponent } from './tenant/mongo/mongo.component';
import { DeviceComponent } from './tenant/device/device.component';
import { UserComponent } from './tenant/user/user.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'tenant', component: TenantComponent,
    children: [
      { path: '', redirectTo: 'feature', pathMatch: 'full' },
      { path: 'feature', component: FeatureComponent },
      { path: 'mongo', component: MongoComponent },
      { path: 'server', component: ServerComponent },
      { path: 'device', component: DeviceComponent },
      { path: 'user', component: UserComponent }
    ]
  }
];
