import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, Observable } from 'rxjs';
import { JobsModel } from '../models/jobs.model';
const getJobs = 'http://localhost:3005/jobs';
const usersURL = 'http://localhost:3005/users';
@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<JobsModel[]> {
    return this.http.get<JobsModel[]>(getJobs);
  }

  jobs: JobsModel[];
  currentJobId: number = 1;

  getCurrentJob(jobId: number): Observable<JobsModel> {
    const getJob = getJobs.concat('/', jobId.toString());
    return this.http.get<JobsModel>(getJob);
  }

  addJob(job: JobsModel): Observable<JobsModel> {
    const userId = (job.UserId).toString();
    const action = "create-job";
    const addJobURL = usersURL.concat("/",userId, "/",action);
    return this.http.post<JobsModel>(addJobURL, job);
  }


}
