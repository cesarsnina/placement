import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SkillsModel } from '../models/skills.model';
import { environment } from 'src/environments/environment';

const getSkillUrl = environment.baseUrl + "/skills";
@Injectable({
  providedIn: 'root'
})

export class SkillsService {
    constructor(private http: HttpClient) { }
  getAll(): Observable<SkillsModel[]> {
    return this.http.get<SkillsModel[]>(getSkillUrl);
  }
}