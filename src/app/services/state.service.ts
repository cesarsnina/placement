import { Injectable } from '@angular/core';
import { State } from '../models/state.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  state: State;
  constructor(private route: Router) {}
  authenticate(): void {
    if (!this.state) {
      this.state = {
        currentUser: {
          firstName: '',
          lastName: '',
          email: '',
          userId: 0,
          isLoggedIn: false,
        },
        currentJob: {
          jobId: 0,
        },
      };
      this.route.navigate(['/']);
    }
  }
}
