import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './RouterGuard/auth-guard.service';
import { CompanyHomeGuardService } from './RouterGuard/company-home-guard.service';
import { GeneralService } from './Services/general.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home', loadComponent: () =>
      import('src/app/Components/home/home.component')
        .then(m => m.HomeComponent),
    canActivate: [AuthGuardService], children: [
      {
        path: 'company',
        loadComponent: () => import('src/app/Components/Company-Components/company-home/company-home.component')
          .then(m => m.CompanyHomeComponent), canActivate: [CompanyHomeGuardService]
      },
      {
        path: 'profile',
        loadComponent: () => import('src/app/Components/Company-Components/profile/profile.component')
          .then(m => m.ProfileComponent), canActivate: [CompanyHomeGuardService]
      }
    ]
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
export class AppRoutingModule {

}
