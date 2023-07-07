import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userToEdit: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    points: 0,
    rank: '',
    totalQuestsAttempts: 0,
    badges: ['']
  }
userName: string = ""
inputSwitch = true
departments: string[] = []


constructor (private route: ActivatedRoute, private authService: AuthService,
   private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const user = params.get('user')
        
        if(user){
          this.usersService.getOneUsersInfo(user).subscribe({
            next: (response) => {
              this.userToEdit = response
              this.userName = user;
            }
          })
        }
      }
    })
    this.usersService.getAllDepartments().subscribe({
      next: (response) => {
        this.departments = response.splice(0, response.length-1)
      }
    })
  }

editUser(){
  this.usersService.editUser(this.userToEdit.id, this.userToEdit).subscribe({
    next: (response)=>{
      this.router.navigate(["/users-info/", this.userName])
    }
  });
}

toggle = () => this.inputSwitch = !this.inputSwitch

}