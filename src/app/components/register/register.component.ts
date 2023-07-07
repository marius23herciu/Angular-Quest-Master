import { LoginDetails } from './../../models/login-details.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from 'src/app/models/authenticated-response.model';
import { RegisterModel } from 'src/app/models/register.model';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  credentials: RegisterModel = {username:'', password:'', firstName:'', lastName:'', email:'', department:''}
  loginDetails: LoginDetails = {invalidLogin:false, inSubmision:false}
  departments: string[] = []
  inputSwitch = true

  constructor(private router: Router, private http: HttpClient,
     private auth: AuthService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllDepartments().subscribe({
      next: (response) => {
        this.departments = response.splice(0, response.length-1)
      }
    })
  }

  
  register = ( form: NgForm) => {
    this.loginDetails= {invalidLogin:false, inSubmision:true}
    if (form.valid) {
      this.http.post<AuthenticatedResponse>("https://localhost:7138/api/auth/register", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: () => {
          this.auth.succesfullRegister=true
          this.router.navigate(["/login"]);
        },
        error: (err: HttpErrorResponse) => this.loginDetails= {invalidLogin:true, inSubmision:false}
      })
      if (this.auth.succesfullRegister)
      {
        setTimeout(() => {
          this.auth.succesfullRegister=false
        }, 3000);
      }
    }
  }

  toggle = () => this.inputSwitch = !this.inputSwitch
}
