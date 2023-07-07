import { AuthService } from 'src/app/services/auth.service';

import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { QuestsService } from 'src/app/services/quests.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuestComponent } from '../quests/quest/quest.component';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  questsId: number[] = []
  points=0;
  startedRandomQ=false
  answeredCorrect=0
  bonusPoints=false
  userName=''
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
  category = ''
  categories: string[] = []
  difficulty = ''
  difficulties: string[] = []
  randomCategory = false
  randomDifficulty = false
  pointsBonus = 0
  
  constructor(public auth: AuthService, private questsService: QuestsService,
    private route: ActivatedRoute,private dialogRef: MatDialog,private usersService: UsersService) { }

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
        }
      })
  }, 50);
  this.questsService.getAllCategories().subscribe({
    next: (response) => {
      this.categories = response
    }
  })
  this.questsService.getDifficultyLevels().subscribe({
    next: (response) => {
      this.difficulties = response
    }
  })
  }

  getRandomQuests()
  {
    this.points=0
    this.pointsBonus = 0
    this.answeredCorrect=0
    this.randomCategory = false
    this.randomDifficulty=false
    this.bonusPoints=false
    this.questsService.getRandomQuests(5, this.user.id).subscribe({
      next: (response) => {
        this.questsId = response
        this.questsId.forEach(id => {
          this.openDialog(id)
        });
      }
    }
    )
    setTimeout(()=>{                        
      this.startedRandomQ=true;
  }, 1000);
  }


  getRandomQuestsByCategory(category: string)
  {
    this.points=0
    this.pointsBonus = 0
    this.answeredCorrect=0
    this.randomCategory = true
    this.randomDifficulty=false
    this.bonusPoints=false
    this.questsService.getRandomQuestsByCategory(5, category, this.user.id).subscribe({
      next: (response) => {
        this.questsId = response
        this.questsId.forEach(id => {
          this.openDialog(id)
        });
      }
    }
    )
    setTimeout(()=>{                        
      this.startedRandomQ=true;
  }, 1000);
}

getRandomQuestsByDifficulty(difficulty: string)
  {
    this.points=0
    this.pointsBonus = 0
    this.answeredCorrect=0
    this.randomCategory = false
    this.randomDifficulty=true
    this.bonusPoints=false
    this.questsService.getRandomQuestsByDifficulty(5, difficulty, this.user.id).subscribe({
      next: (response) => {
        this.questsId = response
        this.questsId.forEach(id => {
          this.openDialog(id)
        });
      }
    }
    )
    setTimeout(()=>{                        
      this.startedRandomQ=true;
  }, 1000);
}

    openDialog(questId: number) {
      const dialog = this.dialogRef.open(QuestComponent, {
        data:{
          questId:questId,
          userId:this.user.id,
          randomQuest:true,
          bonusPoints:this.bonusPoints
        }
      });
  
      dialog.afterClosed().subscribe(result => {
        this.points+=result.points
        if(result.correct==true){
          this.answeredCorrect+=1
        }
        
        if(this.answeredCorrect==5&&this.randomCategory===true){
          this.questsService.addPointsByCategory(result.userId, this.category, 65).subscribe()
          this.bonusPoints=true
          this.pointsBonus = 65
          this.points+=65
       }
       if(this.answeredCorrect==5&&this.randomDifficulty===true){
        if(this.difficulty=='Easy'){
          this.questsService.addPointsToEachCategory(result.userId, 2).subscribe()
          this.bonusPoints=true
          this.pointsBonus = 26
          this.points+=26
        }
        if(this.difficulty=='Medium'){
          this.questsService.addPointsToEachCategory(result.userId, 5).subscribe()
          this.bonusPoints=true
          this.pointsBonus = 65
          this.points+=65
        }
        if(this.difficulty=='Hard'){
          this.questsService.addPointsToEachCategory(result.userId, 10).subscribe()
          this.bonusPoints=true
          this.pointsBonus = 130
          this.points+=130
        }
       
     }
        if(this.answeredCorrect==5&&this.randomCategory===false){
           this.questsService.addPointsToEachCategory(result.userId, 10).subscribe()
           this.bonusPoints=true
           this.pointsBonus = 130
           this.points+=130
        }
      });
    }

  isUserAuthenticated = false
   
}
