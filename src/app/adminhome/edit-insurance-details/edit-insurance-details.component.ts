import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from 'src/app/api-calls.service';
import { Insurancedetails } from 'src/app/insurancedetails';

@Component({
  selector: 'app-edit-insurance-details',
  templateUrl: './edit-insurance-details.component.html',
  styleUrls: ['./edit-insurance-details.component.css']
})
export class EditInsuranceDetailsComponent implements OnInit {

  editInsuranceDetailsForm: FormGroup;
  errorMessage:String = '';
  insDetails: Insurancedetails;

  constructor(private route: ActivatedRoute,private apiCallsService: ApiCallsService,private router: Router) { 
    this.route.queryParams.subscribe(params => {
      console.log(params["insuranceId"]);
      let insurancedetails: Insurancedetails={
        insuranceId: params["insuranceId"],
        insuranceName:params["insuranceName"],
        insuranceType:params["insuranceType"],
        tenure: params["tenure"],
        insuranceAssuredAmount:params["insuranceAssuredAmount"],
        premium:params["params"],
      };      
      this.insDetails =  insurancedetails;
      console.log(JSON.stringify(this.insDetails));
  });
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.editInsuranceDetailsForm = new FormGroup({
      insuranceId : new FormControl(this.insDetails.insuranceId,[Validators.required]),
      insuranceName: new FormControl(this.insDetails.insuranceName, [Validators.required]),
      insuranceType: new FormControl(this.insDetails.insuranceType, [Validators.required]),
      tenure: new FormControl(this.insDetails.tenure, [Validators.required]),
      insuranceAssuredAmount: new FormControl(this.insDetails.insuranceAssuredAmount, [Validators.required]),
      premium: new FormControl(this.insDetails.premium, [Validators.required]),
      });
  }

  editForm() {
    let insurancedetails: Insurancedetails={
      insuranceId: this.editInsuranceDetailsForm.controls.insuranceId.value,
      insuranceName:this.editInsuranceDetailsForm.controls.insuranceName.value,
      insuranceType:this.editInsuranceDetailsForm.controls.insuranceType.value,
      tenure:this.editInsuranceDetailsForm.controls.tenure.value,
      insuranceAssuredAmount:this.editInsuranceDetailsForm.controls.insuranceAssuredAmount.value,
      premium:this.editInsuranceDetailsForm.controls.premium.value,
    };
    console.log(insurancedetails);
    this.apiCallsService.editInsurancedetails(insurancedetails).subscribe(
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
