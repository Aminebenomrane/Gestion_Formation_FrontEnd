import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/register-request';
import { Role } from '../models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  registerRequest: RegisterRequest = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: Role.Collaborateur,
    age: 0,
    grade: ''
  };
  DataResponse :any;
  loginRequest: LoginRequest = { email: '', password: '' };
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService ,  
    private routes:Router,private authService: AuthService, private snackBar: MatSnackBar) {}

    showSuccessMessage() {
      const config = new MatSnackBarConfig();
      config.duration = 3000; // Duration in milliseconds
      config.horizontalPosition = 'center'; // Set the horizontal position to center
      config.verticalPosition = 'top'; // Set the vertical position to top
  
      this.snackBar.open('Registration succeeded!', 'Close', config);
    }

    showFailMessage() {
      
      const config = new MatSnackBarConfig();
      config.duration = 3000; // Duration in milliseconds
      config.horizontalPosition = 'center'; // Set the horizontal position to center
      config.verticalPosition = 'top'; // Set the vertical position to top
  
      this.snackBar.open('Registration failed!', 'Close', config);
    }

    LoginFailMessage() {
      
      const config = new MatSnackBarConfig();
      config.duration = 3000; // Duration in milliseconds
      config.horizontalPosition = 'center'; // Set the horizontal position to center
      config.verticalPosition = 'top'; // Set the vertical position to top
  
      this.snackBar.open('Login failed!', 'Close', config);
    }

  login() {
    console.log(this.loginRequest);
    this.authService.login(this.loginRequest)

      .subscribe(
        (response) => {
        this.DataResponse = response
        if(this.DataResponse['access_token'] !=null){   // Handle successful login response
          const accessToken = response.access_token;
          const refreshToken = response.refresh_token;
          console.log('Access Token:', accessToken);
          console.log('Refresh Token:', refreshToken);

          // Store the tokens in local storage or session storage
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);

          // Decode the access token to extract user information
          const decodedToken = this.authService.decodeToken(accessToken);
          console.log('Decoded Token:', decodedToken);

          // Access user information from the decoded token
          localStorage.setItem('user_info', JSON.stringify(decodedToken));
        
        this.routes.navigate(['/responsable/home']); 
        }
          // Redirect or perform further actions
          // e.g., navigate to a protected route
        },
        (error: any) => {
          this.LoginFailMessage();
          // Handle error response
          console.error('Login failed:', error);
        }
      );
  }


  register() {
    this.authService.register(this.registerRequest)
      .subscribe(
        (response: any) => {
          // Handle successful registration response
          const accessToken = response.access_token;
          const refreshToken = response.refresh_token;
          console.log('Access Token:', accessToken);
          console.log('Refresh Token:', refreshToken);

          // Store the tokens in local storage
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);

          // Decode the access token to extract user information
          const decodedToken = this.authService.decodeToken(accessToken);
          console.log('Decoded Token:', decodedToken);

          // Store the decoded token in local storage
          localStorage.setItem('user_info', JSON.stringify(decodedToken));
          this.showSuccessMessage();
          // Redirect or perform further actions
          // e.g., navigate to a protected route
        },
        (error: any) => {
          this.showFailMessage();
          // Handle error response
          console.error('Registration failed:', error);
        }
      );
  }
}