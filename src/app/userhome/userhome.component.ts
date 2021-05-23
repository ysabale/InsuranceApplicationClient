import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { ApiCallsService } from '../api-calls.service';
import { AuthenticationService } from '../authentication.service';
import { ButtonRendererComponent } from '../button-renderer-component';
import { UserPolicy } from '../user-policy';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
    
  loginId:String = '';
  private gridApi;
  columnDefs: ColDef[] = [];
  rowData: UserPolicy[] = [];
  frameworkComponents: any;

  
  constructor(private route:ActivatedRoute,private router:Router,
    private apiCallService: ApiCallsService,public loginService:AuthenticationService) {
    this.route.queryParams.subscribe(params => {
      console.log(params["loginId"]);
      this.loginId=params["loginId"];
    });
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }   
   }

  ngOnInit(): void {
    this.createColumnDefs();
    this.getData();
  }

  getData() {
    this.apiCallService.getUserPolicyByLoginId(this.loginService.getLoginId()).subscribe(
      res => {
        this.rowData = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
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



buyInsurance() {
  this.router.navigate(['insurance']);
}

}
