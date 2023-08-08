import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './RouterGuard/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home', loadComponent: () =>
      import('src/app/Components/Home/home/home.component')
        .then(m => m.HomeComponent),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login', loadComponent: () =>
      import('src/app/Components/Sign/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register', loadComponent: () =>
      import('src/app/Components/Sign/register/register.component')
        .then(m => m.RegisterComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
