import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInsuranceDetailsComponent } from './adminhome/add-insurance-details/add-insurance-details.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { EditInsuranceDetailsComponent } from './adminhome/edit-insurance-details/edit-insurance-details.component';
import { AuthGaurdService } from './auth-guard.service';
import { InsuranceComponent } from './insurance/insurance.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UserRegistrationComponent } from './userhome/user-registration/user-registration.component';
import { UserhomeComponent } from './userhome/userhome.component';

const routes: Routes = [
  {
  path: 'userHome',
  component: UserhomeComponent,
  canActivate:[AuthGaurdService]
  },
  {
    path: 'adminHome',
    component: AdminhomeComponent,
    canActivate:[AuthGaurdService]
    },
    {
      path: '',
      component: LoginComponent
      },
      {
        path: 'addInsuranceDetails',
        component: AddInsuranceDetailsComponent,
        canActivate:[AuthGaurdService]
        },
        {
          path: 'editInsuranceDetails',
          component: EditInsuranceDetailsComponent,
          canActivate:[AuthGaurdService]
        },
        {
          path: 'userRegistration',
          component: UserRegistrationComponent        },
        {
          path: 'logout',
          component: LogoutComponent
        },
        {
          path: 'insurance',
          component: InsuranceComponent
        }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
