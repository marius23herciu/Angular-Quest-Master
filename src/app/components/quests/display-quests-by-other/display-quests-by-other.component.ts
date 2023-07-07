import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestBasicDetails } from 'src/app/models/quest-basic-details';
import { QuestsService } from 'src/app/services/quests.service';
import { QuestComponent } from '../quest/quest.component';

@Component({
  selector: 'app-display-quests-by-other',
  templateUrl: './display-quests-by-other.component.html',
  styleUrls: ['./display-quests-by-other.component.css']
})
export class DisplayQuestsByOtherComponent {
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
  other = ''
  filterSwitch: boolean = false
  filtered: boolean = false
  others: string[] = ["Popularity", "Successful Rate", "Users' Ratings"]
  sortBy: string = ''

  page: number=1
  count: number=0
  tableSize: number=5
  tableSizes: any = [5,10,15,20]

  constructor (private route: ActivatedRoute, private questsService: QuestsService, private router: Router,
    private dialogRef: MatDialog) {} 
  
  ngOnInit(): void {
        this.route.params.subscribe((params) => {
          this.other = params['other'];   })

        if(this.other==='popularity'){
          this.questsService.getQuestsByPopularity().subscribe({
            next: (response) => {
              this.quests=response
            }
          })
        }
        if(this.other==='successful-rate'){
          this.questsService.getQuestsBySuccessfulRate(this.other).subscribe({
            next: (response) => {
              this.quests=response
            }
          })
        }
        if(this.other==="users-rating"){
          this.questsService.getQuestsByUsersRating(this.other).subscribe({
            next: (response) => {
              this.quests=response
            }
          })
        }
      }

      openDialog(questId: number){
        this.dialogRef.open(QuestComponent, {
          data:{
            questId:questId 
          }
        })
      }

  getQuestsByPopularity(){
    this.questsService.getQuestsByPopularity().subscribe({
      next: (response) => {
        this.quests=response
      }
    })
  }
  getQuestsBySuccessRate(){
    this.questsService.getQuestsBySuccessfulRate().subscribe({
      next: (response) => {
        this.quests=response
      }
    })
  }
  getQuestsByUsersRating(){
    this.questsService.getQuestsByUsersRating().subscribe({
      next: (response) => {
        this.quests=response
      }
    })
  }

  goToOtherFunction(category: string){
    if( category==='Popularity')
    {
      category='popularity'
      this.router.navigate(['/quests-by/', category]).then(() => {
        window.location.reload();
      })
    }
    if( category==='Successful Rate')
    {
      category='successful-rate'
      this.router.navigate(['/quests-by/', category]).then(() => {
        window.location.reload();
      })
    }
    if( category==="Users' Ratings")
    {
      category='users-rating'
      this.router.navigate(['/quests-by/', category]).then(() => {
        window.location.reload();
      })
    }
  
    
  }

  toggle = () => this.filterSwitch = !this.filterSwitch

  onTableDataChange(event: any, category: string)
  {
    this.page = event;
    if( category==='popularity')
    {
      this.getQuestsByPopularity()
    }
    if( category==='successful-rate')
    {
      this.getQuestsBySuccessRate()
    }
    if( category==="users-rating")
    {
      this.getQuestsByUsersRating()
    }
  
  }

  onTableSizeChange(event: any):void
  {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getQuestsByPopularity();
  }
}
