import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobComponent } from './create-job/create-job.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {path: '',                redirectTo: '/', pathMatch: 'full' },
  {path: '',                component: HomePageComponent},
  {path: 'signup',          component: SignupComponent},
  {path: 'login',           component: LoginComponent},
  {path: 'create-job',      component: CreateJobComponent},
  {path: 'update-job',      component: UpdateJobComponent},
  {path: 'update-user',      component: UpdateUserComponent},
  {path: 'job-description', component: JobDescriptionComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
