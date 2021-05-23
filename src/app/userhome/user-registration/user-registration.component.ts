import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ApiCallsService } from 'src/app/api-calls.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  errorMessage:String = '';

  registrationForm : FormGroup;
  private useUrl :String;
  constructor(private apiService: ApiCallsService,private router: Router) {
    
   }

  ngOnInit(): void {
    this.creteRegistrationForm();
  }

  creteRegistrationForm()
  {
    this.registrationForm = new FormGroup({
      name : new FormControl('',[Validators.required, Validators.minLength(1)]),
      mobileNo : new FormControl('',[Validators.required, Validators.minLength(1),Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      loginId:new FormControl('',[Validators.required, Validators.minLength(1)]),
      password:new FormControl('',[Validators.required, Validators.minLength(1)]),
    });
  }

  

  SubmitForm(){
    console.log("Registration Page...");
    debugger
    let user: User={ 
      name: this.registrationForm.controls.name.value,
      address: '',
      mobile: this.registrationForm.controls.mobileNo.value,
      emailId: '',
      gender: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      loginId:this.registrationForm.controls.loginId.value,
      password:this.registrationForm.controls.password.value,
      userType: 'User'
      
    };
    console.log(JSON.stringify(user));
    this.apiService.saveUserDetails(user).subscribe(
      resp => {
        console.log("User Data Saved Successfully");
        const navigationExtras: NavigationExtras = {
          queryParams: {
            loginId: user.loginId,
          }
        };
        this.router.navigate(['userHome'],navigationExtras);
      }
      ,
      error=>{
        console.log(error);
        this.errorMessage = error.error.errorMessage;
      }

    );
  }

  get f(){  
    return this.registrationForm.controls;  
  }  
}
