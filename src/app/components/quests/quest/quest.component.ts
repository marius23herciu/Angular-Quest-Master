import { RateQuest } from './../../../models/rate-quest';

import { Component, Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quest } from 'src/app/models/quest';
import { SolveQuest } from 'src/app/models/solve-quest';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { QuestsService } from 'src/app/services/quests.service';
import { UsersService } from 'src/app/services/users.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Injectable({
  providedIn:"root"
})
@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent {

  quest: Quest = {
    category: '',
    difficulty: '',
    title: '',
    question: '',
    image: '',
    video: '',
    audio: '',
    option1: '',
    option2: '',
    option3: '',
    tipsAndLinks: '',
    endAvailabilityDate: '',
    totalAttempts: 0,
    rateOfSuccess: 0,
    usersRating: 0,
    createdByActiveUser: false,
    allowedToSolve: false,
    allreadyRated: false
  }
  questId = 0
  userName: string = ""
  correctAnswer = false
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
  solveQuest: SolveQuest = {
    
    userId:0,
    answer:''
  }
  answered: boolean=false
  randomQuest: boolean=false
  optionSelected: boolean=false
  selectedAnswer: string = ''
  
  stars = [1,2,3,4,5]
  rating = 0
  rated = false
  rateQuest: RateQuest = {
   userId:0,
   questId:0,
   rating:0,
  }
  points=0

  constructor (public auth: AuthService, private route: ActivatedRoute, private questsService: QuestsService,
    private usersService: UsersService, @Inject(MAT_DIALOG_DATA,) public data:any,
    public dialogRef: MatDialogRef<QuestComponent>) {
    this.questId=data.questId
    dialogRef.disableClose = true;
    
    setTimeout(()=>{                        
      this.getUser()
  }, 100);

    setTimeout(()=>{                        
      this.questsService.getQuest(data.questId, this.user.id).subscribe({
        next: (response) => {
          this.quest = response
          this.questId = data.questId;
          if(data.randomQuest){
            this.randomQuest=data.randomQuest
          }
          (<HTMLIFrameElement>document.getElementById('videoIframe')).src = this.quest.video;
          (<HTMLIFrameElement>document.getElementById('audioIframe')).src = this.quest.audio;
        }
      })
  }, 600);

    this.auth.getName().subscribe({
      next: (response) => {
        this.userName = response
        console.log(response)
      }
    })

    } 
    onClose() {
      this.dialogRef.close({points:this.points, correct: this.correctAnswer, userId:this.user.id});
      }
  ngOnInit(): void {
   

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')
      
     
      }
    });
    
    this.auth.getName().subscribe({
      next: (response) => {
        this.userName = response
        console.log(response)
      }
    })
    setTimeout(()=>{                        
      this.getUser()
  }, 500);
  }
  
  getUser(){
    this.usersService.getOneUsersInfo(this.userName).subscribe({
      next: (response) => {
        this.user = response
      }
    })
  }

  selectAnswer(answer: string)
  {
    this.optionSelected=true
    this.selectedAnswer = answer
  }


  resolveQuest(questId: number, userId: number, answer: string){
    this.solveQuest = this.createSolveQuest(userId, answer)
    
    this.questsService.resolveQuest(questId, this.solveQuest).subscribe({
      next: (response) => {
        this.correctAnswer=response
        this.answered=true
        if(this.quest.difficulty=='Easy'&&this.correctAnswer){
          this.points=25
        }
        if(this.quest.difficulty=='Medium'&&this.correctAnswer){
          this.points=50
        }
        if(this.quest.difficulty=='Hard'&&this.correctAnswer){
          this.points=100
        }
      }
    })
  }

  createSolveQuest(userId: number, answer: string): SolveQuest{
   this.solveQuest.userId=userId
   this.solveQuest.answer=answer
   return this.solveQuest
  }
  
  updateRating(star: number){
    this.rating=star;
  }

  rateQ(rating: number){
    this.rateQuest.questId = this.questId
    this.rateQuest.userId = this.user.id
    this.rateQuest.rating = rating
    this.questsService.rateQuest(this.rateQuest).subscribe({
      next: (response) => {
        this.rated=response
      }
    })
  }
}
