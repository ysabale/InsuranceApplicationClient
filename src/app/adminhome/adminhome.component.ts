import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ApiCallsService } from '../api-calls.service';
import { AuthenticationService } from '../authentication.service';
import { ButtonRendererComponent } from '../button-renderer-component';
import { Insurancedetails } from '../insurancedetails';
import { User } from '../user';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent {

  private gridApi;
  columnDefs: ColDef[] = [];
  rowData: User[] = [];
  insuranceDetails: Insurancedetails[];
  frameworkComponents: any;

  constructor(private apiCallService: ApiCallsService, private router: Router,public loginService:AuthenticationService) { 
    this.createColumnDefs();
    this.getData();
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
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
}
