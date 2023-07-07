import { LoginDetails } from './../../models/login-details.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from 'src/app/models/authenticated-response.model';
import { LoginModel as LoginModel } from 'src/app/models/login.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: LoginModel = {username:'', password:''}
  loginDetails: LoginDetails = {invalidLogin:false, inSubmision:false}
  
  constructor(public router: Router, private http: HttpClient, private auth: AuthService) { }

  succesfullRegister=this.auth.succesfullRegister

  ngOnInit(): void {
    
  }
   login = ( form: NgForm) => {
    this.loginDetails= {invalidLogin:false, inSubmision:true}
    if (form.valid) {
      this.http.post<AuthenticatedResponse>("https://localhost:7138/api/auth/login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          const refreshToken = response.refreshToken;
          localStorage.setItem("jwt", token); 
          localStorage.setItem("refreshToken", refreshToken);
          this.auth.isAuthenticated$=this.auth.isAuthenticated(this.auth.getToken())
          this.router.navigate(["/"])
          .then(() => {
            window.location.reload();
          });
        },
        error: (err: HttpErrorResponse) => this.loginDetails= {invalidLogin:true, inSubmision:false}
      })
    }
  }
}