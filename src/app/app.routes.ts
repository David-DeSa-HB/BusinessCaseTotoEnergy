import {Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ForbiddenComponent} from './pages/forbidden/forbidden.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {authGuard} from './guards/auth/auth.guard';
import {noAuthGuard} from './guards/no-auth/no-auth.guard';
import {PowerListComponent} from './pages/power-list/power-list.component';
import {AddPowerComponent} from './pages/add-power/add-power.component';
import {EditPowerComponent} from './pages/edit-power/edit-power.component';
import {PowerDetailComponent} from './pages/power-detail/power-detail.component';
import {roleGuard} from './guards/roles/roles.guard';

export const routes: Routes = [
  {path: '', canActivate: [authGuard], component: DashboardComponent},
  {path: 'login', canActivate: [noAuthGuard], component: LoginComponent},
  {path: 'register', canActivate: [noAuthGuard], component: RegisterComponent},

  {
    path: 'power', canActivate: [authGuard, roleGuard], data: {roles:['ROLE_ADMIN']}, children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: PowerListComponent},
      {path: 'add', component: AddPowerComponent},
      {path: 'edit/:id', component: EditPowerComponent},
      {path: ':id', component: PowerDetailComponent},
    ]
  },

  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

