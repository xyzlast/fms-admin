import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FeatureComponent } from './feature/feature.component';
import { MongoComponent } from './mongo/mongo.component';
import { ServerComponent } from './server/server.component';
import { UserComponent } from './user/user.component';
import { DeviceComponent } from './device/device.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'feature', component: FeatureComponent },
  { path: 'mongo', component: MongoComponent },
  { path: 'server', component: ServerComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'user', component: UserComponent }
];
