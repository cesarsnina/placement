import { Component, OnInit } from '@angular/core';
import { StateService } from './services/state.service';
import { JobsModel } from './models/jobs.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Placement';
  filtedJobs: JobsModel[] = [];
  // retrieve list of filted jobs from child component
  updateJobs(newList: JobsModel[]): void {
    this.filtedJobs = newList;
  }
  constructor(private stateService: StateService) {

  }
  ngOnInit(): void {
    this.stateService.authenticate();
  }
}
