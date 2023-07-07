import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  departments: string[] = []
  categories: string[] = []
  department: string = ''
  category: string = ''
  filterSwitch: boolean = false
  filtered: boolean = false
  alphabeticalOrder: boolean = false

  page: number=1
  count: number=0
  tableSize: number=5
  tableSizes: any = [5,10,15,20]

  constructor (private usersService: UsersService) {} 

  ngOnInit(): void {

    this.usersService.getAllDepartments().subscribe({
      next: (response) => {
        this.departments = response
      }
    })
    this.usersService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response
      }
    })


    this.usersService.getAllUsersByRank().subscribe({
      next: (users:User[])=>{
        this.users = users 
      },
      error: (response:string)=> {
        console.log(response);
      }
    })
  }

  getUsersAlphabetically()
  {
    this.alphabeticalOrder=true;
    this.usersService.getAllUsers().subscribe({
    next: (users:User[])=>{
      this.users = users 
    },
    error: (response:string)=> {
      console.log(response);
    }
  })
}

getAllUsersByRank(){
  this.alphabeticalOrder=false;
  this.usersService.getAllUsersByRank().subscribe({
    next: (users:User[])=>{
      this.users = users 
    },
    error: (response:string)=> {
      console.log(response);
    }
  })
}

getAllUsersByDepartment(form: NgForm){
  if (form.valid){this.usersService.getAllUsersByDepartment(this.department).subscribe({
    next: (users:User[])=>{
      this.users = users 
    },
    error: (response:string)=> {
      console.log(response);
    }
  })
}}

getAllUsersByCategory(form: NgForm){
  if (form.valid){this.usersService.getAllUsersByCategory(this.category).subscribe({
    next: (users:User[])=>{
      this.users = users 
    },
    error: (response:string)=> {
      console.log(response);
    }
  })
}}

getAllUsersByDepartmentAndCategory(form: NgForm){
  if (form.valid){this.usersService.getAllUsersByCategoryAndDepartment(this.department, this.category).subscribe({
    next: (users:User[])=>{
      this.users = users 
    },
    error: (response:string)=> {
      console.log(response);
    }
  })
}}

filterFunction(form: NgForm){
  this.filtered=true
  if(this.category===''||this.category==="All categories"&& this.department!='')
  {
    this.getAllUsersByDepartment(form);
  }
   if (this.category!=''&& this.department ===''|| this.department === "All departments")
  {
    this.getAllUsersByCategory(form);
  }
   if(this.category!=''&& this.department !='')
  {
    this.getAllUsersByDepartmentAndCategory(form);
  }
   if (this.category === "All categories" || this.category==='' && this.department === "All departments"||this.department ==='')
  {
    this.getAllUsersByRank();
  }
}
filterFunction2(department: string, category: string){
  this.filtered=true
  if(this.category===''||this.category==="All categories"&& this.department!='')
  {
    this.usersService.getAllUsersByDepartment(department).subscribe({
      next: (users:User[])=>{
        this.users = users 
      },
      error: (response:string)=> {
        console.log(response);
      }
    })
  
  }
  else if (this.category!=''&& this.department ===''|| this.department === "All departments")
  {
    this.usersService.getAllUsersByCategory(category).subscribe({
      next: (users:User[])=>{
        this.users = users 
      },
      error: (response:string)=> {
        console.log(response);
      }
    })
  
  }
  else if(this.category!=''&& this.department !='')
  {
    this.usersService.getAllUsersByCategoryAndDepartment(department, category).subscribe({
      next: (users:User[])=>{
        this.users = users 
      },
      error: (response:string)=> {
        console.log(response);
      }
    })
  }
}

toggle = () => this.filterSwitch = !this.filterSwitch

onTableDataChange(event: any, department: string, category: string)
  {
    this.page = event;
    if (this.filtered===true)
    {
      this.filterFunction2(department, category);
    }
    if(this.alphabeticalOrder===true&&this.filtered===false)
    {
      this.getUsersAlphabetically();
    }
    if(this.alphabeticalOrder===false&&this.filtered===false)
    {
      this.getAllUsersByRank();
    }
    
  }

  onTableSizeChange(event: any):void
  {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllUsersByRank();
  }
}

