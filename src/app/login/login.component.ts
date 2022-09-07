import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersModel } from '../models/users.model';
import { UsersService } from '../services/users.service';

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

  constructor(private usersService: UsersService, private route: Router) {}

  onSubmit() {
    const user = this.logInForm.value;
    this.logUser(user);
  }

  logUser(user: UsersModel[]): void {
    this.usersService.logUser(user).subscribe({
      next: (data) => {
        console.log("response", data);
      },
      error: (e) => console.error(e),
    });
    
  }

  retrieveUsers(): void {
    this.usersService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (e) => console.error(e),
    });
  }
  ngOnInit(): void {
    this.retrieveUsers();
  }
}
