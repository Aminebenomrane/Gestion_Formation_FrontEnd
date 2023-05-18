import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt' ;
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  helper = new JwtHelperService()
  constructor(private http: HttpClient) { }
  login(data:any){
    return this.http.post('http://localhost:8020/api/v1/auth/authenticate',data)
    
  }

  Register(data:any):Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/auth/register',data)
    
  }
  SaveData(token: any  ){
    localStorage.setItem('token',token) ; 
  }

  getData(){
    let token :any = localStorage.getItem('token') ;
    if(token!=null){
      let decode = this.helper.decodeToken(token) ;
      
      return decode
    }else{
      return "false" 
    }
  }
}
