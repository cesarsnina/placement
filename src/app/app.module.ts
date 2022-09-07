import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { JobCardComponent } from './job-card/job-card.component';
import { InfoComponent } from './info/info.component';
import { FilterComponent } from './filter/filter.component';
import { FilterListComponent } from './filter/filter-list.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateUserComponent } from './update-user/update-user.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    JobCardComponent,
    InfoComponent,
    FilterComponent,
    FilterListComponent,
    JobDescriptionComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    CreateJobComponent,
    UpdateJobComponent,
    UpdateUserComponent,
    NavbarComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatRadioModule,
    MatCheckboxModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
