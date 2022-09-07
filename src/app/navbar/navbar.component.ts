import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State} from '../models/state.model';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @Input() state?: State;

  constructor(private route: Router, private stateService: StateService) {}
  onClick(clicked: string): void {    
    if(clicked == "logo") {
      this.route.navigate(['/']);
    } else if (clicked == "create-job") {
      if (this.stateService.state.currentUser.isLoggedIn) {
        this.route.navigate(['/create-job']);
      } else {
        this.route.navigate(['/']);
      }
    } else if (clicked == "profile") {
      if (this.stateService.state.currentUser.isLoggedIn) {
        this.route.navigate(['/update-user']);
      } else {
        this.route.navigate(['/']);
      }
    } else if (clicked == "about") {
      this.route.navigate(['/']);
    } else if (clicked == "signup") {
      if (!this.stateService.state.currentUser.isLoggedIn) {
        this.route.navigate(['/signup']);
      } 
    } else if (clicked == "login") {
      if (!this.stateService.state.currentUser.isLoggedIn) {
        this.route.navigate(['/login']);
      } else {
        this.route.navigate(['/']);
      }
    }
  }

  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.stateService.authenticate();
  }
}
