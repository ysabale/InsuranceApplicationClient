import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-buy-insurance',
  templateUrl: './buy-insurance.component.html',
  styleUrls: ['./buy-insurance.component.css']
})
export class BuyInsuranceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BuyInsuranceComponent>) { }

  ngOnInit(): void {
  }
  
  close() {
    this.dialogRef.close();
  }

}
