import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuestBasicDetails } from 'src/app/models/quest-basic-details';
import { QuestsService } from 'src/app/services/quests.service';
import { QuestComponent } from '../quest/quest.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-display-quests-by-category',
  templateUrl: './display-quests-by-category.component.html',
  styleUrls: ['./display-quests-by-category.component.css']
})
export class DisplayQuestsByCategoryComponent {
 
  quests: QuestBasicDetails[] = [
    {
      id: 0,
      category:'',
      difficulty: '',
      title: '',
      totalAttempts: 0,
      rateOfSuccess: 0,
      usersRating: 0,
    },
  ]
  category = ''
  filterSwitch: boolean = false
  filtered: boolean = false
  categories: string[] = []
  sortBy: string = ''
  difficulty = ''
  difficulties: string[] = []
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

  page: number=1
  count: number=0
  tableSize: number=5
  tableSizes: any = [5,10,15,20]

  constructor (private route: ActivatedRoute, private questsService: QuestsService,
    private dialogRef: MatDialog, private auth: AuthService, private usersService: UsersService ) {} 
  
  ngOnInit(): void {
        this.route.params.subscribe((params) => {
          this.category = params['category'];   })

        if(this.category){
          this.questsService.getQuestsByCategory(this.category).subscribe({
            next: (response) => {
              this.quests=response
            }
          })
        }
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
            this.difficulties.push("All Difficulties")
          }
        })
      }
      openDialog(questId: number){
        this.dialogRef.open(QuestComponent, {
          data:{
            questId:questId ,
            userId: this.user.id
          }
        })
      }
      getQuestsByCategoryAndDifficulty(category: string, difficulty: string){
        if ( difficulty==="All Difficulties")
        {
          this.questsService.getQuestsByCategory(category).subscribe({
            next: (response) => {
              this.quests=response
            }
          })
        }
        this.questsService.getQuestsByCategoryAndDifficulty(category, difficulty).subscribe({
          next: (response) => {
            this.quests=response
          }
        })
      }
  getQuestsByCategory(category: string){
        this.questsService.getQuestsByCategory(category).subscribe({
          next: (response) => {
            this.quests=response
          }
        })
      }

  toggle = () => this.filterSwitch = !this.filterSwitch

  getAllCategories(){
    this.questsService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response
      }
    })
  }

  onTableDataChange(event: any, category: string)
  {
    this.page = event;
    this.getQuestsByCategoryAndDifficulty(this.category,this.difficulty);
    
  }

  onTableSizeChange(event: any):void
  {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getQuestsByCategoryAndDifficulty(this.category,this.difficulty);
  }
 };
  

