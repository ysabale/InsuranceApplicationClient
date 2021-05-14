import { HttpClientModule } from '@angular/common/http';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminhomeComponent,
    UserhomeComponent,
    AddInsuranceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAlertModule,
    AgGridModule.withComponents(null)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
