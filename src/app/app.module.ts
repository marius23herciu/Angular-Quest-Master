import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { RegisterComponent } from './components/register/register.component';
import { MostActiveUsersComponent } from './components/most-active-users/most-active-users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersInfoComponent } from './components/users-info/users-info.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { RouterModule } from '@angular/router';
import { QuestComponent } from './components/quests/quest/quest.component';
import { QuestsMainPageComponent } from './components/quests/quests-main-page/quests-main-page.component';
import { DisplayQuestsByCategoryComponent } from './components/quests/display-quests-by-category/display-quests-by-category.component';
import { DisplayQuestsByDifficultyComponent } from './components/quests/display-quests-by-difficulty/display-quests-by-difficulty.component';
import { DisplayQuestsByOtherComponent } from './components/quests/display-quests-by-other/display-quests-by-other.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { CreatedQuizzesComponent } from './components/created-quizzes/created-quizzes.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    UsersListComponent,
    RegisterComponent,
    MostActiveUsersComponent,
    UsersInfoComponent,
    EditUserComponent,
    QuestComponent,
    QuestsMainPageComponent,
    DisplayQuestsByCategoryComponent,
    DisplayQuestsByDifficultyComponent,
    DisplayQuestsByOtherComponent,
    CreateQuizComponent,
    CreatedQuizzesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule,
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
 // exports: [ UsersInfoComponent,
  //EditUserComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
