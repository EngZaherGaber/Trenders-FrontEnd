import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './RouterGuard/auth-guard.service';
import { CompanyHomeGuardService } from './RouterGuard/company-home-guard.service';
import { GeneralService } from './Services/general.service';
import { InstituteHomeGuardService } from './RouterGuard/institute-home-guard.service';

const routes: Routes = [

  {
    path: 'company', loadComponent: () => import('src/app/Components/home/home.component')
      .then(m => m.HomeComponent),
    canActivate: [AuthGuardService], canActivateChild: [CompanyHomeGuardService], loadChildren: () => [
      {
        path: '',
        loadComponent: () => import('src/app/Components/Company-Components/company-home/company-home.component')
          .then(m => m.CompanyHomeComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('src/app/Components/Company-Components/profile/profile.component')
          .then(m => m.ProfileComponent)
      },
      {
        path: 'add-offer/:id',
        loadComponent: () => import('src/app/Components/Company-Components/form-viewer/form-viewer.component')
          .then(m => m.FormViewerComponent)
      },
    ]
  },
  {
    path: 'institute', loadComponent: () => import('src/app/Components/home/home.component')
      .then(m => m.HomeComponent),
    canActivate: [AuthGuardService], canActivateChild: [InstituteHomeGuardService], loadChildren: () => [
      {
        path: '',
        loadComponent: () => import('src/app/Components/Instituation-Components/institiuation-home/institiuation-home.component')
          .then(m => m.InstitiuationHomeComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('src/app/Components/Instituation-Components/profile/profile.component')
          .then(m => m.ProfileComponent)
      },
      {
        path: 'add-trender',
        loadComponent: () => import('src/app/Components/Instituation-Components/form-builder/form-builder.component')
          .then(m => m.FormBuilderComponent)
      },
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
  },
  {
    path: '',
    redirectTo: 'company',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
