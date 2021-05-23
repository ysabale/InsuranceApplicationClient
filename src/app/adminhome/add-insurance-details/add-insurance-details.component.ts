import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/api-calls.service';
import { Insurancedetails } from 'src/app/insurancedetails';

@Component({
  selector: 'app-add-insurance-details',
  templateUrl: './add-insurance-details.component.html',
  styleUrls: ['./add-insurance-details.component.css']
})
export class AddInsuranceDetailsComponent implements OnInit {

  errorMessage:String = '';
  addInsuranceDetailsForm: FormGroup;

  constructor(private apiCallsService: ApiCallsService, private router: Router){}
  ngOnInit(): void {
    this.createForm();
  }

  get f(){
    return this.addInsuranceDetailsForm.controls;
  }

  createForm() {
    this.addInsuranceDetailsForm = new FormGroup({
      insuranceId : new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      insuranceName: new FormControl('', [Validators.required]),
      insuranceType: new FormControl('', [Validators.required]),
      tenure: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      insuranceAssuredAmount: new FormControl('', [Validators.required]),
      premium: new FormControl('', [Validators.required]),
      });
    
  }

  submitForm() {    
    let insurancedetails: Insurancedetails={
      insuranceId: this.addInsuranceDetailsForm.controls.insuranceId.value,
      insuranceName:this.addInsuranceDetailsForm.controls.insuranceName.value,
      insuranceType:this.addInsuranceDetailsForm.controls.insuranceType.value,
      tenure:this.addInsuranceDetailsForm.controls.tenure.value,
      insuranceAssuredAmount:this.addInsuranceDetailsForm.controls.insuranceAssuredAmount.value,
      premium:this.addInsuranceDetailsForm.controls.premium.value,
    };
    console.log(insurancedetails);
    this.apiCallsService.saveInsurancedetails(insurancedetails).subscribe(
        resp => { 
          this.router.navigate(['insurance']);
      },
      (error:any)=>{
        console.log(error.error.errorMessage);
        this.errorMessage = error.error.errorMessage;
      }
    );

  }

}
