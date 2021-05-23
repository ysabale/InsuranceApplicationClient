import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../api-calls.service';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   errorMessage:String = '';
   invalidLogin:Boolean = false;
   signInForm: FormGroup;

  constructor(private apiCallsService : ApiCallsService,private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createNewUser()
  {
    console.log("Registration Page Called...");
    this.router.navigate(['userRegistration']); 
  }

  createForm() {
    this.signInForm = new FormGroup({
      loginId : new FormControl('',[Validators.required, Validators.minLength(1)]),
      password: new FormControl('', [Validators.required, Validators.minLength(1)]),
      });
    
  }

  get f() { return this.signInForm.controls; }


  checkLogin () {
    let user: User={
      loginId: this.signInForm.controls.loginId.value,
      password:this.signInForm.controls.password.value,
      name: "",
      address: "",
      mobile: "",
      emailId: "",
      gender: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      userType: "",
    };
     this.authenticationService.validateUser (user).subscribe(
     data => {
      var value: string =  user.loginId;
      var userType: string =  data.userType;
      var loginId: string =  data.loginId;
      sessionStorage.setItem('userType', userType);
      sessionStorage.setItem('username', value);
      sessionStorage.setItem('loginId', loginId);
      
      if(data ==null) {
        this.errorMessage = "Invalid Credential";
        console.log(this.errorMessage);
    } else {
      console.log(data.userType);
      if(data.userType==='Admin') {
        this.router.navigate(['insurance']); 
      } else if(data.userType==='User') {
        this.router.navigate(['userHome']); 
      } else {
        console.log("Something Went Wrong");
      } 
    }
    },
    error => {
      this.invalidLogin = true;
     // console.log("invalidlogin:"+this.invalidLogin);
    });
  }

  SubmitForm(){
    
    console.log("Welcome");
    
    let user: User={
      loginId: this.signInForm.controls.loginId.value,
      password:this.signInForm.controls.password.value,
      name: "",
      address: "",
      mobile: "",
      emailId: "",
      gender: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      userType: "",
    };
    console.log(user);
    this.apiCallsService.validateUser(user).subscribe(
      (data:User)=>{
          if(data ==null) {
            this.errorMessage = "Invalid Credential";
            console.log(this.errorMessage);
        } else {
          console.log(data.userType);
          if(data.userType==='Admin') {
            this.router.navigate(['adminHome']); 
          } else if(data.userType==='User') {
            this.router.navigate(['userHome']); 
          } else {
            console.log("Something Went Wrong");
          } 
        }
      },
      (error:any)=>{console.log(error)}
    );

    
     
  
  }



}
