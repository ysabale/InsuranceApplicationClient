import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { NavigationExtras, Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ApiCallsService } from '../api-calls.service';
import { AuthenticationService } from '../authentication.service';
import { ButtonRendererComponent } from '../button-renderer-component';
import { Insurancedetails } from '../insurancedetails';
import { User } from '../user';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { BuyInsuranceComponent } from '../buy-insurance/buy-insurance.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserPolicy } from '../user-policy';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent  implements OnInit{

  private gridApi;
  columnDefs: ColDef[] = [];
  rowData: User[] = [];
  insuranceDetails: Insurancedetails[];
  frameworkComponents: any;
  title = "Example Angular 10 Material Dialog";
  closeResult: string;
  errorMessage: String;
  userPolicyForm: FormGroup;
  showDialog = false;
  
  insuranceId: Number;
  insuranceName: String;
  insuranceType: String;
  tenure: String;
  sumAssuredAmount: Number;
  loginId: String;
  premium: Number;

  constructor(private modalService: NgbModal,private apiCallService: ApiCallsService, private router: Router,public loginService:AuthenticationService,private matDialog: MatDialog) { 
    this.createColumnDefs();
    this.getData();
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  ngOnInit() {
  }

  
  
  
  createForm() {
    this.userPolicyForm = new FormGroup({
      insuranceId : new FormControl(this.insuranceId),
      insuranceName: new FormControl(this.insuranceName),
      insuranceType: new FormControl(this.insuranceType),
      tenure: new FormControl(this.tenure),
      insuranceAssuredAmount: new FormControl(this.sumAssuredAmount),
      premium: new FormControl(this.premium),
      });
    
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(BuyInsuranceComponent, dialogConfig);
    this.createForm();
  }
  createColumnDefs() {
    this.columnDefs = [
      {
        headerName: 'Insurance Id', 
        field: 'insuranceId',
        sortable: true,
        filter: true,
        checkboxSelection: true
      },
      {
        headerName: 'Insurance Name',
        field: 'insuranceName',
        sortable: true,
        filter: true
      },
      {
        headerName: 'Insurance Type',
         field: 'insuranceType',
         sortable: true,
         filter: true
      },
      {
        headerName: 'Tenure',
         field: 'tenure',
         sortable: true,
         filter: true
      },
      {
        headerName: 'Insurance Assured Amount',
        field: 'insuranceAssuredAmount',
        sortable: true,
        filter: true
      }
    ];
  }

  buybutton (e) {
    alert("hi");  
  }

  getData1() {
    this.apiCallService.gettest().subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error);
      }
    );
  }

  getData() {
    this.apiCallService.getInsuranceDetails().subscribe(
      res => {
        this.rowData = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  onAddRow() {
    this.router.navigate(['addInsuranceDetails']);
  }

  editItems() {
    this.insuranceDetails = this.getSelectedRowData();
    if(this.insuranceDetails.length==0) {
      alert("Please Select Record !");
    } else if(this.insuranceDetails.length>1) {
      alert("More than one record is selected For Edit. Please Select One Only !")
    } else {
      //alert(JSON.stringify(this.insuranceDetails));
      const navigationExtras: NavigationExtras = {
        queryParams: {
          insuranceId: this.insuranceDetails[0].insuranceId,
          insuranceName: this.insuranceDetails[0].insuranceName,
          insuranceType: this.insuranceDetails[0].insuranceType,
          tenure: this.insuranceDetails[0].tenure,
          insuranceAssuredAmount: this.insuranceDetails[0].insuranceAssuredAmount,
          premium: this.insuranceDetails[0].premium,
        }
      };
      this.router.navigate(['editInsuranceDetails'], navigationExtras);

    }
  }

  onRemoveSelected() {
    let response = confirm("Are you sure to delete ?");
    if(response) {
    console.log(response);
    this.insuranceDetails = this.getSelectedRowData();
    if(this.insuranceDetails.length==0) {
      alert("Please Select Record");
    } else {
     console.log(this.insuranceDetails);
     this.apiCallService.deleteInsuranceDetails(this.insuranceDetails).subscribe(
      resp => {
        alert("Record Delted Successfully!");
        this.getData();
      } ,
      error => {
        console.log(error);
      }
    );
    }
  }
  }

  getSelectedRowData() {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);
    //alert(JSON.stringify(selectedData));
    return selectedData;
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  buyNewPolicy() {
    this.insuranceDetails = this.getSelectedRowData();
    if(this.insuranceDetails.length==0) {
      alert("Please Select Record !");
    } else if(this.insuranceDetails.length>1) {
      alert("You can buy one policy at a time ! Select one policy only")
    }
  }

  open(content) {
    this.insuranceDetails = this.getSelectedRowData();
    this.insuranceId = this.insuranceDetails[0].insuranceId;
    this.insuranceName = this.insuranceDetails[0].insuranceName;
    this.insuranceType= this.insuranceDetails[0].insuranceType;
    this.tenure= this.insuranceDetails[0].tenure;
    this.sumAssuredAmount= this.insuranceDetails[0].insuranceAssuredAmount;
    this.premium= this.insuranceDetails[0].premium;
    this.createForm();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  saveBuyPolicy() {
    let userPolicy : UserPolicy={
      insuranceId: this.userPolicyForm.controls.insuranceId.value,
      insuranceName:this.userPolicyForm.controls.insuranceName.value,
      insuranceType:this.userPolicyForm.controls.insuranceType.value,
      tenure:this.userPolicyForm.controls.tenure.value,
      insuranceAssuredAmount:this.userPolicyForm.controls.insuranceAssuredAmount.value,
      premium:this.userPolicyForm.controls.premium.value,
      loginId: this.loginService.getLoginId(),
    };
    console.log(userPolicy);
    let response = confirm("Are you sure to buy policy ?");
    if(response) {
    this.apiCallService.saveUserPolicy(userPolicy).subscribe(
        resp => { 
          this.router.navigate(['userHome']);
      },
      (error:any)=>{
        console.log(error.error.errorMessage);
        this.errorMessage = error.error.errorMessage;
      }
    );
    }
  }
}
