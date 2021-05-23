import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Insurancedetails } from './insurancedetails';
import { UserPolicy } from './user-policy';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  validateUserUrl = 'http://localhost:8081/validateUser';
  insuranceDetailsUrl = 'http://localhost:8081/getInsuranceDetails';
  saveInsuranceDetailsUrl = 'http://localhost:8081/saveInsuranceDetails';
  deleteInsuranceDetailsUrl= 'http://localhost:8081/deleteInsuranceDetails';
  updateInsurancedetailsUrl= 'http://localhost:8081/updateInsuranceDetails';
  saveUserDetailsUrl='http://localhost:8081/saveUserDetails';
  getUserPolicyUrl='http://localhost:8081/getUserPolicy';
  saveUserPolicyUrl='http://localhost:8081/saveUserPolicy';
  getUserPolicyLoginIdUrl='http://localhost:8081/getUserPolicyDetailsByUser';
  constructor(private httpClient: HttpClient) 
  { 
    
  }

  saveUserPolicy(userPolicy: UserPolicy):Observable<any> {
    return this.httpClient.post<UserPolicy>(this.saveUserPolicyUrl,userPolicy);
  }

  getUserPolicy():Observable<any> {
    return this.httpClient.get<UserPolicy>(this.getUserPolicyUrl);
  }

  getUserPolicyByLoginId(loginId: String):Observable<any> {
    let url = this.getUserPolicyLoginIdUrl+'/'+loginId;
    return this.httpClient.post<UserPolicy>(url,null);
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

  editInsurancedetails(insuranceDetails: Insurancedetails):Observable<any> {
    return this.httpClient.put(this.updateInsurancedetailsUrl,insuranceDetails);
  }
  saveUserDetails(user:User):Observable<any>
  {
    return this.httpClient.post<User>(this.saveUserDetailsUrl,user)
  } 

  gettest():Observable<any>
  {
    return this.httpClient.get('http://localhost:8081/helloadmin')
  } 
  
 }
