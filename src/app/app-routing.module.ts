import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { RegisterComponent } from './components/register/register.component';
import { MostActiveUsersComponent } from './components/most-active-users/most-active-users.component';
import { UsersInfoComponent } from './components/users-info/users-info.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { QuestComponent } from './components/quests/quest/quest.component';
import { QuestsMainPageComponent } from './components/quests/quests-main-page/quests-main-page.component';
import { DisplayQuestsByCategoryComponent } from './components/quests/display-quests-by-category/display-quests-by-category.component';
import { DisplayQuestsByDifficultyComponent } from './components/quests/display-quests-by-difficulty/display-quests-by-difficulty.component';
import { DisplayQuestsByOtherComponent } from './components/quests/display-quests-by-other/display-quests-by-other.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { CreatedQuizzesComponent } from './components/created-quizzes/created-quizzes.component';

const routes: Routes = [
  { path: '',
  component: HomeComponent 
 },
 {path: 'login',
  component: LoginComponent
 },
 {path: 'users',
  component: UsersListComponent
 },
 {path: 'users-info/:user',
  component: UsersInfoComponent
 },
 {path: 'edit-user/:user',
  component: EditUserComponent
 },
 {path: 'register',
 component: RegisterComponent
},
{path: 'active-users',
  component: MostActiveUsersComponent
 },
 {path: 'quest/:id',
  component: QuestComponent
 },
 {path: 'quests-main',
  component: QuestsMainPageComponent
 },
 {path: 'quests-by-category/:category',
  component: DisplayQuestsByCategoryComponent
 },
 {path: 'quests-by-difficulty/:difficulty',
  component: DisplayQuestsByDifficultyComponent
 },
 {path: 'quests-by/:other',
  component: DisplayQuestsByOtherComponent
 },
 {path: 'create-quiz',
  component: CreateQuizComponent
 },
 {path: 'created-quizzes',
  component: CreatedQuizzesComponent
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
