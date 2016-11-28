import { Routes, RouterModule } from '@angular/router';
import { DriversComponent } from './drivers';
import { ConstructorsComponent } from './constructors';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: DriversComponent },
  { path: 'about', component: AboutComponent },
  { path: 'drivers', component: DriversComponent },
  { path: 'constructors', component: ConstructorsComponent },
  { path: '**',    component: NoContentComponent }
];
