import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'info', component: InfoComponent }
];
