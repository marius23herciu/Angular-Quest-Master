
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseApiUrl = 'https://localhost:7138'

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
     return this.http.get<User[]>(this.baseApiUrl + '/api/users')
  }
  getActiveUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl + '/api/users/most-active-users')
 }
  getAllDepartments(): Observable<string[]> {
    return this.http.get<string[]>(this.baseApiUrl + '/api/users/departments')
 }
 getAllCategories(): Observable<string[]> {
  return this.http.get<string[]>(this.baseApiUrl + '/api/users/categories')
}
getAllUsersByRank(): Observable<User[]> {
  return this.http.get<User[]>(this.baseApiUrl + '/api/users/users-ranking')
}
getAllUsersByDepartment(department: string): Observable<User[]> {
  return this.http.get<User[]>(this.baseApiUrl + '/api/users/users-ranking-by-' + department)
}
getAllUsersByCategory(category: string): Observable<User[]> {
  return this.http.get<User[]>(this.baseApiUrl + '/api/users/ranking-' + category)
}
getAllUsersByCategoryAndDepartment(dep: string, categ: string): Observable<User[]> {
  return this.http.get<User[]>(this.baseApiUrl + '/api/users/ranks-' +dep + '-and-' + categ)
}
getOneUsersInfo(userName: string): Observable<User> {
  return this.http.get<User>(this.baseApiUrl + '/api/users/' + userName)
}
editUser(id: number, user: User): Observable<User> {
  return this.http.put<User>(this.baseApiUrl + '/api/users/' + id, user)
}
}
 