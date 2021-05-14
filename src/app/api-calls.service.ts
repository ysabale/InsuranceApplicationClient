import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Insurancedetails } from './insurancedetails';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  validateUserUrl = 'http://localhost:8081/validateUser';
  insuranceDetailsUrl = 'http://localhost:8081/getInsuranceDetails';
  saveInsuranceDetailsUrl = 'http://localhost:8081/saveInsuranceDetails';
  deleteInsuranceDetailsUrl= 'http://localhost:8081/deleteInsuranceDetails';

  constructor(private httpClient: HttpClient) 
  { 
    
  }

  validateUser(user:User):Observable<any>
  {
    return this.httpClient.post<User>(this.validateUserUrl,user);
  }

  getInsuranceDetails():Observable<any> {
    return this.httpClient.get<Insurancedetails>(this.insuranceDetailsUrl);
  }

  saveInsurancedetails(insurancedetails: Insurancedetails):Observable<any> {
    return this.httpClient.post<Insurancedetails>(this.saveInsuranceDetailsUrl,insurancedetails);
  }
  
  deleteInsuranceDetails(insurancedetails: Insurancedetails[]):Observable<any> {
    return this.httpClient.request('delete',this.deleteInsuranceDetailsUrl,{body:insurancedetails});
  }
  
}
