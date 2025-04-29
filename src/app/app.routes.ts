import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadComponent } from './components/upload/upload.component';
import { PlannerComponent } from './components/planner/planner.component';
import { PublicOutfitsComponent } from './components/public-outfits/public-outfits.component';
import { HomeComponent } from './components/home/home.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'planner', component: PlannerComponent },
  { path: 'public', loadComponent: () => import('./components/public-outfits/public-outfits.component').then(m => m.PublicOutfitsComponent) },
];
