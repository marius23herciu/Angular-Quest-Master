import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuestBasicDetails } from 'src/app/models/quest-basic-details';
import { QuestsService } from 'src/app/services/quests.service';
import { QuestComponent } from '../quest/quest.component';

@Component({
  selector: 'app-display-quests-by-difficulty',
  templateUrl: './display-quests-by-difficulty.component.html',
  styleUrls: ['./display-quests-by-difficulty.component.css']
})
export class DisplayQuestsByDifficultyComponent {
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
  difficulty = ''
  filterSwitch: boolean = false
  filtered: boolean = false
  difficulties: string[] = []
  sortBy: string = ''
  category = ''
  categories: string[] = []

  page: number=1
  count: number=0
  tableSize: number=5
  tableSizes: any = [5,10,15,20]

  constructor (private route: ActivatedRoute, private questsService: QuestsService,
    private dialogRef: MatDialog) {} 
  
  ngOnInit(): void {
        this.route.params.subscribe((params) => {
          this.difficulty = params['difficulty'];   })

        if(this.difficulty){
          this.questsService.getQuestsByDifficulty(this.difficulty).subscribe({
            next: (response) => {
              this.quests=response
            }
          })
        }

        this.questsService.getDifficultyLevels().subscribe({
          next: (response) => {
            this.difficulties = response
          }
        })
        this.questsService.getAllCategories().subscribe({
          next: (response) => {
            this.categories = response
            this.categories.push("All Categories")
          }
        })
      }

      openDialog(questId: number){
        this.dialogRef.open(QuestComponent, {
          data:{
            questId:questId 
          }
        })
      }

  getQuestsByDifficulty(difficulty: string){
        this.questsService.getQuestsByDifficulty(difficulty).subscribe({
          next: (response) => {
            this.quests=response
          }
        })
      }

      getQuestsByCategoryAndDifficulty(category: string, difficulty: string){
        if(category==="All Categories")
        {
          this.questsService.getQuestsByDifficulty(difficulty).subscribe({
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
      
  toggle = () => this.filterSwitch = !this.filterSwitch

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
}
