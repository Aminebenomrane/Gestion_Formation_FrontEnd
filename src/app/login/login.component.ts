import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BackendApiService } from "app/services/backend-api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private auth:BackendApiService) {

  }
  DataResponse :any

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.auth.login(loginForm.value).subscribe((response) =>{  
      // console.log(response);
      this.DataResponse = response
      console.log(this.DataResponse['access_token'])
      this.auth.SaveData(this.DataResponse['access_token'])

    });

  }
  
}
