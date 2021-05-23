import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import {map} from 'rxjs/operators';
import { AuthenticationRequest } from './authentication-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username, password) {
    let authentiacationRequest: AuthenticationRequest={
      username: username,
      password:password
    };
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    console.log(authentiacationRequest);
    return this.httpClient.post<any>('http://localhost:8081/authenticate',authentiacationRequest).pipe(
     map (
       userData => {
        let tokenString =  userData.token;
       // console.log("token:"+tokenString);
        sessionStorage.setItem('token', tokenString);
        sessionStorage.setItem('username',username);
        return userData;
       }
     )
    );
  }
  
  validateUser(user:User):Observable<any>
  {
    return this.httpClient.post<User>('http://localhost:8081/validateUser',user);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  getLoginId() {
    let loginId = sessionStorage.getItem('loginId')
    if(loginId!=null) {
      return loginId;
    }
    return '';
  }

  isAdmin() {
    let userType = sessionStorage.getItem('userType')
    console.log("userType:"+userType);
    if(userType!=null) {
      if(userType=='Admin') {
        return true;
      } 
      return false;
    }
    return !(userType === null)
  }

  isUser() {
    let userType = sessionStorage.getItem('userType')
    console.log("userType:"+userType);
    if(userType!=null) {
      if(userType=='User') {
        return true;
      } 
      return false;
    }
    return !(userType === null)
  }
  
  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('loginId');

  }
}