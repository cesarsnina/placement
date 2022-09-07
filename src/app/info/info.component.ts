import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JobsModel } from '../models/jobs.model';
import { UsersService } from '../services/users.service';
import { JobsService } from '../services/jobs.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  @Input() item: JobsModel;

  constructor(
    private route: Router,
    private userService: UsersService,
    private jobsService: JobsService,
    private stateService: StateService
  ) {}

  navigateToJob() {
    this.jobsService.currentJobId = this.item.id;
    this.stateService.state.currentJob.jobId = this.item.id;
    this.route.navigate(['/job-description']);
  }

  ngOnInit(): void {}
}
