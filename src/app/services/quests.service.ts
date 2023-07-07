import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quest } from '../models/quest';
import { SolveQuest } from '../models/solve-quest';
import { QuestBasicDetails } from '../models/quest-basic-details';
import { RateQuest } from '../models/rate-quest';
import { QuestToCreate } from '../models/quest-to-create';

@Injectable({
  providedIn: 'root'
})
export class QuestsService {
  baseApiUrl = 'https://localhost:7138'

  constructor(private http: HttpClient) { }


  getQuest(questId: number, userId: number): Observable<Quest> {
    return this.http.get<Quest>(this.baseApiUrl + '/api/quests/' + questId + '/' + userId)
  }
  resolveQuest(questId: number, solveQuest: SolveQuest): Observable<any> {
    return this.http.put<any>(this.baseApiUrl + '/api/quests/solve-' + questId , solveQuest)
  }
  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.baseApiUrl + '/api/quests/categories')
 }
 getDifficultyLevels(): Observable<string[]> {
  return this.http.get<string[]>(this.baseApiUrl + '/api/quests/difficulty')
}
getQuestsByCategory(category: string): Observable<QuestBasicDetails[]> {
  return this.http.get<QuestBasicDetails[]>(this.baseApiUrl + '/api/quests/quests-by-' + category)
}
getQuestsByDifficulty(difficulty: string): Observable<QuestBasicDetails[]> {
  return this.http.get<QuestBasicDetails[]>(this.baseApiUrl + '/api/quests/' + difficulty + '/quests')
}
getQuestsByCategoryAndDifficulty(category: string, difficulty: string): Observable<QuestBasicDetails[]> {
  return this.http.get<QuestBasicDetails[]>(this.baseApiUrl + '/api/quests/'+ category + '-and-' + difficulty)
}
getQuestsByPopularity(): Observable<QuestBasicDetails[]> {
  return this.http.get<QuestBasicDetails[]>(this.baseApiUrl + '/api/quests/popularity')
}
getQuestsBySuccessfulRate(success: string="successful-rate"): Observable<QuestBasicDetails[]> {
  return this.http.get<QuestBasicDetails[]>(this.baseApiUrl + '/api/quests/quests-by/'+success)
}
getQuestsByUsersRating(rating: string="users-rating"): Observable<QuestBasicDetails[]> {
  return this.http.get<QuestBasicDetails[]>(this.baseApiUrl + '/api/quests/quests-by/'+rating)
}
rateQuest(rateQuest: RateQuest): Observable<boolean> {
  return this.http.put<boolean>(this.baseApiUrl + '/api/quests/rate-quest' , rateQuest)
 }
 getRandomQuests(noOfQuests: number, userId: number): Observable<number[]> {
  return this.http.get<number[]>(this.baseApiUrl + '/api/quests/' + noOfQuests +'-random-quests/for-' + userId)
}
addPointsToEachCategory(userId: number, points: number): Observable<boolean> {
  return this.http.post<boolean>(this.baseApiUrl + '/api/quests/bonus-' + points , userId)
 }
 addPointsByCategory(userId: number, category: string, points: number): Observable<boolean> {
  return this.http.post<boolean>(this.baseApiUrl + '/api/quests/add-'+ points+'/for-'+category , userId )
 }
 getRandomQuestsByCategory(noOfQuests: number, category: string, userId: number): Observable<number[]> {
  return this.http.get<number[]>(this.baseApiUrl + '/api/quests/'  + 'random-' +noOfQuests+'/'+ category +'/'+ userId)
}
getRandomQuestsByDifficulty(noOfQuests: number, difficulty: string, userId: number): Observable<number[]> {
  return this.http.get<number[]>(this.baseApiUrl + '/api/quests/' + noOfQuests + '-random'+'/'+ difficulty +'/'+ userId)
}
createQuest(userId: number, createQuest: QuestToCreate): Observable<any> {
  return this.http.post<any>(this.baseApiUrl + '/api/quests/quest-' + userId , createQuest)
}
getAvailableCategs(userId: number): Observable<string[]> {
  return this.http.get<string[]>(this.baseApiUrl + '/api/quests/get-categ-to-create-for-' + userId)
}
getQuestsByCreator(userId: number): Observable<QuestBasicDetails[]> {
  return this.http.get<QuestBasicDetails[]>(this.baseApiUrl + '/api/quests/' + userId)
}
}
