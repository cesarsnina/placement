import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersModel } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() users?: UsersModel[];

  logInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private usersService: UsersService,
    private route: Router,
    private stateService: StateService
  ) {}

  onSubmit() {
    const user = this.logInForm.value;
    this.logUser(user);
  }

  logUser(user: UsersModel[]): void {
    this.usersService.logUser(user).subscribe({
      next: (data) => {
        this.retrieveUsers();
        this.route.navigate(['/']);
      },
      error: (e) => console.error(e),
    });
  }

  retrieveUsers(): void {
    this.usersService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        const lastIndex = this.users?.length - 1;
        this.stateService.state = {
          currentUser: {
            firstName: this.users[lastIndex].firstName,
            lastName: this.users[lastIndex].lastName,
            email: this.users[lastIndex].email,
            userId: this.users[lastIndex].id,
            isLoggedIn: true,
          },
          currentJob: {
            jobId: 0,
          },
        };
      },
      error: (e) => console.error(e),
    });
  }
  ngOnInit(): void {
    // this.retrieveUsers();
  }
}
