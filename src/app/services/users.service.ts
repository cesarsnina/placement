import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersModel } from '../models/users.model';

import { environment } from 'src/environments/environment';

// const getJobs = environment.baseUrl + "/jobs";
// const usersURL = environment.baseUrl + "/users";
const getUsersURL = environment.baseUrl +  "/users";
const addUserURL = environment.baseUrl +  "/signup";
const logUserURL = environment.baseUrl +  "login";
@Injectable({
  providedIn: 'root'
})

export class UsersService {

  isLoggedIn: boolean = true;
  currentUserId: number = 0;
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<UsersModel[]> {
    return this.http.get<UsersModel[]>(getUsersURL);
  }

  addUser(user: UsersModel[]): Observable<UsersModel[]> {
     return this.http.post<UsersModel[]>(addUserURL, user);
  }

  logUser(user: UsersModel[]): Observable<UsersModel[]> {

    return this.http.post<UsersModel[]>(logUserURL, user);
  }
}