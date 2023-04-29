import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt' ;
@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  helper = new JwtHelperService()
  constructor(private http: HttpClient) { }
  login(data:any){
    return this.http.post('http://localhost:8080/api/v1/auth/authenticate',data)
    
  }
  SaveData(token: any  ){
    localStorage.setItem('token',token) ; 
    
  }
}
