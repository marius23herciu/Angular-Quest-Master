import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestToCreate } from 'src/app/models/quest-to-create';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { QuestsService } from 'src/app/services/quests.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent {
  questToCreate: QuestToCreate = {
    category: '',
    difficulty: '',
    title: '',
    question: '',
    image: '',
    video: '',
    audio: '',
    answer: '',
    option1: '',
    option2: '',
    option3: '',
    tipsAndLinks: '',
    availabilityInDays: 365
  }
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
inputSwitch = true
difficulties: string[] = ["Easy", "Medium", "Hard"]
categories: string[] = []
newQuestId = 0
quizCreated = false
fail = false

  constructor (public auth: AuthService, private route: ActivatedRoute, private questsService: QuestsService,
    private usersService: UsersService,private router: Router) {} 

    ngOnInit(): void {

      this.auth.getName().subscribe({
        next: (response) => {
          this.userName = response
          console.log(response)
        }
      })
      setTimeout(()=>{                        
        this.usersService.getOneUsersInfo(this.userName).subscribe({
          next: (response) => {
            this.user = response
            console.log(response)
          }
        })
    }, 100);
      
      setTimeout(()=>{                        
        this.questsService.getAvailableCategs(this.user.id).subscribe({
          next: (response) => {
            this.categories = response
          }
        })
    }, 200);
    }
    
createQuiz(){
 this.questsService.createQuest(this.user.id, this.questToCreate).subscribe({
  next: (response) => {
    if(response){
      this.quizCreated = true
    }
    else{
      this.fail=true
    }
 }})
}
reload(){
  window.location.reload()
}
}
