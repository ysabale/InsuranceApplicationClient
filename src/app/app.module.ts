import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { AddInsuranceDetailsComponent } from './adminhome/add-insurance-details/add-insurance-details.component';
import { EditInsuranceDetailsComponent } from './adminhome/edit-insurance-details/edit-insurance-details.component';
import { UserRegistrationComponent } from './userhome/user-registration/user-registration.component';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { BasicAuthHtppInterceptorService } from './basic-auth-htpp-interceptor.service';
import { InsuranceComponent } from './insurance/insurance.component';
import { BuyInsuranceComponent } from './buy-insurance/buy-insurance.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminhomeComponent,
    UserhomeComponent,
    AddInsuranceDetailsComponent,
    EditInsuranceDetailsComponent,
    UserRegistrationComponent,
    LogoutComponent,
    HeaderComponent,
    InsuranceComponent,
    BuyInsuranceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAlertModule,
    AgGridModule.withComponents(null),
    MatDialogModule
  ],
  providers: 
  [
     {   provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true
  } 
  ],
  bootstrap: [AppComponent],
  entryComponents: [BuyInsuranceComponent]
})
export class AppModule { }
