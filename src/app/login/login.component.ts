import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BackendApiService } from "app/services/backend-api.service";
import { Router } from '@angular/router';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private auth:BackendApiService ,  private routes:Router) {

  }
  DataResponse :any

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.auth.login(loginForm.value).subscribe((response) =>{  
      // console.log(response);
      this.DataResponse = response
      //console.log(this.DataResponse);
      if(this.DataResponse['access_token'] !=null){
       // console.log(this.DataResponse['access_token'])
        this.auth.SaveData(this.DataResponse['access_token'])
        this.routes.navigate(['/dashboard']); 
      }else{
        console.log("Wrong")
      }
      
      //this.auth.getData()
    });

  }

  Register(RegisterForm: NgForm) {
    const formGroup = RegisterForm.form;
        formGroup.setValue({
          ...formGroup.value,
          "role": "user"
        });
    console.log(formGroup.value)
    this.auth.Register(formGroup.value)
  }
  
}
