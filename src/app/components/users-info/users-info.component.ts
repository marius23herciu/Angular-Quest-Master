import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { QuestsService } from 'src/app/services/quests.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent {

  user: User = {
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
  quests = 0

  constructor (public auth: AuthService, private route: ActivatedRoute, private usersService: UsersService,
    private questsService: QuestsService) {} 
  
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const user = params.get('user')
        
        if(user){
          this.usersService.getOneUsersInfo(user).subscribe({
            next: (response) => {
              this.user = response
              this.userName = user;
            }
          })
        }
      }
    });
    setTimeout(()=>{                        
      this.questsService.getQuestsByCreator(this.user.id).subscribe({
        next: (response) => {
          this.quests=response.length
        }
      })
  }, 150);
  }
  
  getUsersInfo(userName: string){
    this.usersService.getOneUsersInfo(userName).subscribe({
      next: (response) => {
        this.user = response
      }
    })
  }
}
