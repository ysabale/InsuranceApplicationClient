import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInsuranceDetailsComponent } from './adminhome/add-insurance-details/add-insurance-details.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { LoginComponent } from './login/login.component';
import { UserhomeComponent } from './userhome/userhome.component';

const routes: Routes = [
  {
  path: 'customerhome',
  component: UserhomeComponent
  },
  {
    path: 'adminHome',
    component: AdminhomeComponent
    },
    {
      path: '',
      component: LoginComponent
      },
      {
        path: 'addInsuranceDetails',
        component: AddInsuranceDetailsComponent
        },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
