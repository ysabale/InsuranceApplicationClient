import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../api-calls.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   errorMessage:String = '';
   signInForm: FormGroup;

  constructor(private apiCallsService : ApiCallsService,private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signInForm = new FormGroup({
      loginId : new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required]),
      });
    
  }

  get f() { return this.signInForm.controls; }

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
            this.router.navigate(['customerhome']); 
          } else {
            console.log("Something Went Wrong");
          } 
        }
      },
      (error:any)=>{console.log(error)}
    );

    
     
  
  }



}
