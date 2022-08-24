import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobSkillsModel } from '../models/job-skills.model';
import { environment } from 'src/environments/environment';

const jobSkillUrl = environment.baseUrl + "/jobskills";
@Injectable({
  providedIn: 'root'
})

export class JobSkillsService {
    constructor(private http: HttpClient) { }
  getAll(): Observable<JobSkillsModel[]> {
    return this.http.get<JobSkillsModel[]>(jobSkillUrl);
  }
}