import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-most-active-users',
  templateUrl: './most-active-users.component.html',
  styleUrls: ['./most-active-users.component.css']
})
export class MostActiveUsersComponent {

  users: User[] = [];

  page: number=1
  count: number=0
  tableSize: number=5
  tableSizes: any = [5,10,15,20]

  constructor (private usersService: UsersService) {} 

  ngOnInit(): void {
    this.usersList()
  }

  usersList()
  {
    this.usersService.getActiveUsers().subscribe({
      next: (users:User[])=>{
        this.users = users 
      },
      error: (response:string)=> {
        console.log(response);
      }
    })
  }

  onTableDataChange(event: any)
  {
    this.page = event;
    this.usersList();
  }

  onTableSizeChange(event: any):void
  {
    this.tableSize = event.target.value;
    this.page = 1;
    this.usersList();
  }
}
