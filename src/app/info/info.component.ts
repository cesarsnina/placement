import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { JobsModel } from '../models/jobs.model';
import { UsersService } from '../services/users.service';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() item: JobsModel;

  constructor(private route:Router, private userService: UsersService, private jobsService: JobsService) { }

  navigateToJob() {
    this.jobsService.currentJobId = this.item.id;
    setTimeout(() => {
      this.route.navigate(['/job-description']);
    }, 1000)
  }

  ngOnInit(): void {}
}
