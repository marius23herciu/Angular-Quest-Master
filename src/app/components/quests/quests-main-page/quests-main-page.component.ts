import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { QuestsService } from 'src/app/services/quests.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-quests-main-page',
  templateUrl: './quests-main-page.component.html',
  styleUrls: ['./quests-main-page.component.css']
})
export class QuestsMainPageComponent {

  clasification: string[] = ["Category", "Difficulty", "Other"]
  sortBy= ''
  sorted: string[] = []
  filtered: boolean = false

constructor (public auth: AuthService, private route: ActivatedRoute, private questsService: QuestsService,
  private usersService: UsersService,private router: Router, private questService: QuestsService) {} 

ngOnInit(): void {
this.questService.getAllCategories().subscribe({
  next: (response) => {
    this.sorted = response
  }
})

}

filterFunction(sortBy: string){
  this.filtered=true
  if(this.sortBy==='Category'||this.sortBy==="")
  {
    this.getAllCategories();
  }
  if(this.sortBy==='Difficulty')
  {
    this.getDifficultyLevels();
  }
  if (this.sortBy === "Other")
  {
    this.sorted = ["Popularity", "Successful Rate", "Users' Ratings"]
  }
  
}

getAllCategories(){
  this.questService.getAllCategories().subscribe({
    next: (response) => {
      this.sorted = response
    }
  })
}

getDifficultyLevels(){
  this.questService.getDifficultyLevels().subscribe({
    next: (response) => {
      this.sorted = response
    }
  })
}

goToUserRatetQuests(){
  
}

goToFunction(categOrDifficulty: string){
  if (this.sortBy === "Category" || this.sortBy === "")
  {
     this.router.navigate(['/quests-by-category/', categOrDifficulty])
  }
  if (this.sortBy === "Difficulty")
  {
    this.router.navigate(['/quests-by-difficulty/', categOrDifficulty])
  }
}
goToOtherFunction(category: string){
  if( category==='Popularity')
  {
    category='popularity'
    this.router.navigate(['/quests-by/', category])
  }
  if( category==='Successful Rate')
  {
    category='successful-rate'
    this.router.navigate(['/quests-by/', category])
  }
  if( category==="Users' Ratings")
  {
    category='users-rating'
    this.router.navigate(['/quests-by/', category])
  }

  
}
}
