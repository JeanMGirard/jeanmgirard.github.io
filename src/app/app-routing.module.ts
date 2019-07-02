import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService, AuthGuard } from '../core/auth/auth.service';

import { LoginComponent } from '../core/auth/login/login.component';
import { RegisterComponent } from '../core/auth/register/register.component';
import { fromEventPattern } from 'rxjs';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  }, {
    path: 'auth',
    loadChildren:  () => import('../core/auth/auth.module').then(mod => mod.AuthModule)
  }, {
    path: 'me',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
