import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersModel } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { StateService } from '../services/state.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  @Input() users?: UsersModel[];

  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    UserId: new FormControl(''),
    deleteAccount: new FormControl(''),
  });

  constructor(
    private usersService: UsersService,
    private route: Router,
    private stateService: StateService
  ) {}

  onSubmit() {
    const user = this.signUpForm.value;
    console.log(user)
    this.updateUser(user);
  }

  retrieveUsers(): void {
    this.usersService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        console.log("users", this.users)
      },
      error: (e) => console.error(e),
    });
  }

  updateUser(user: UsersModel[]): void {
    this.usersService.updateUser(user).subscribe((response: UsersModel[]) => {
      console.log("updated",response);
    });
    this.retrieveUsers();
  }

  ngOnInit(): void {
    if (!this.stateService.state.currentUser.isLoggedIn) {
      console.log('Please login to modify profile');
      this.route.navigate(['/login']);
    }
    this.signUpForm.valueChanges.subscribe();
    console.log(this.stateService.state);
    this.signUpForm.patchValue({
      firstName: this.stateService.state.currentUser.firstName,
      lastName: this.stateService.state.currentUser.lastName,
      email: this.stateService.state.currentUser.email,
      UserId: this.stateService.state.currentUser.userId
    });
    this.retrieveUsers();
  }
}
