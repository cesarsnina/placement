import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JobsModel } from '../models/jobs.model';
import { UsersService } from '../services/users.service';
import { JobsService } from '../services/jobs.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css'],
})
export class JobDescriptionComponent implements AfterViewInit, OnInit {
  jobs: JobsModel[];
  job: JobsModel;
  jobId: number;
  jobOwner: String = 'Is this your job? Login to edit';

  constructor(
    private route: Router,
    private usersService: UsersService,
    private jobsService: JobsService,
    private stateService: StateService,
  ) {}

  navigateToJob() {
    if (this.stateService.state.currentUser.isLoggedIn) {
      this.jobsService.currentJobId = this.job.id;
      this.stateService.state.currentJob.jobId = this.job.id;
      this.route.navigate(['/update-job']);
    } else {
      this.route.navigate(['/login']);
    }
  }

  retrieveUsers(): void {
    this.jobsService.getAll().subscribe({
      next: (data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id == this.jobId) {
            this.job = data[i];
            break;
          }
        }
      },
      error: (e) => console.error(e),
    });
  }

  ngAfterViewInit(): void {
    this.retrieveUsers();
  }

  ngOnInit(): void {
    this.jobId = this.jobsService.currentJobId;
    if (this.stateService.state.currentUser.isLoggedIn) {
      if (this.stateService.state.currentUser.userId == this.job.UserId) {
        this.jobOwner = "Edit this job";
      } else {
        this.jobOwner = "Go back";
      }
    }
    this.jobsService.getCurrentJob(this.jobId).subscribe({
      next: (data) => {
        this.job = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
