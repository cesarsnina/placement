import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersModel } from '../models/users.model';
import { StateService } from './state.service';

import { environment } from 'src/environments/environment';

const getUsersURL = environment.baseUrl +  "/users";
const addUserURL = environment.baseUrl +  "/signup";
const logUserURL = environment.baseUrl +  "/login";
@Injectable({
  providedIn: 'root'
})

export class UsersService {
  isLoggedIn: boolean = this.stateService.state.currentUser.isLoggedIn;
  currentUserId: number = this.stateService.state.currentUser.userId;
  
  constructor(private http: HttpClient, private stateService: StateService,) { }

  getAll(): Observable<UsersModel[]> {
    return this.http.get<UsersModel[]>(getUsersURL);
  }

  logUser(user: UsersModel[]): Observable<UsersModel[]> {
    return this.http.post<UsersModel[]>(logUserURL, user);
  }

  getUserById(userId: number): Observable<UsersModel> {
    const userURL =getUsersURL + "/" + userId.toString();
    return this.http.get<UsersModel>(userURL);
  }

  addUser(user: UsersModel[]): Observable<UsersModel[]> {
    return this.http.post<UsersModel[]>(addUserURL, user);
  }

  updateUser(user: UsersModel[]): Observable<UsersModel[]> {
    const updateUserURL =getUsersURL + "/" + this.currentUserId.toString();
    return this.http.put<UsersModel[]>(updateUserURL, user)
 }

}