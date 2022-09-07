import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersModel } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { StateService } from '../services/state.service';
// import { HttpErrorResponse } from '@angular/common/http';

export interface user {
  id: Number;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  image: String;
  resume: String;
  bio: String;
  experience: Number;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @Input() users?: UsersModel[];

  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  });

  response: user;

  constructor(
    private usersService: UsersService,
    private stateService: StateService,
    private route: Router
  ) {}

  onSubmit() {
    const user = this.signUpForm.value;
    var repeatPassword = true;
    if (user.password != user.repeatPassword) {
      repeatPassword = !repeatPassword;
      console.log(
        "Repeated password don't match",
        user.password,
        user.repeatPassword
      );
    } else if (repeatPassword) {
      this.addUser(user);
    }
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

  addUser(user: UsersModel[]): void {
    this.usersService.addUser(user).subscribe({
      next: (response) => {
        this.retrieveUsers();
        this.route.navigate(['/']);
      },
      error: (error) => {
        if (error.error == 'Email already exist') {
          this.route.navigate(['/login']);
        }
      },
    });
  }
  ngOnInit(): void {
  }
}
