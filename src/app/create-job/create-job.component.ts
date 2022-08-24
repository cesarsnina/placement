import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';

import { JobsService } from '../services/jobs.service';
import { JobSkillsService } from '../services/job-skills.service'
import { SkillsService } from '../services/skills.service'

import { JobsModel } from '../models/jobs.model';
import { JobSkillsModel} from '../models/job-skills.model'
import { SkillsModel} from '../models/skills.model'
import { UsersModel } from '../models/users.model';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css'],
})
export class CreateJobComponent implements OnInit {

  @Input() users?: UsersModel[];
  @Input() jobSkill?: JobSkillsModel[];
  @Input() skills?: SkillsModel[];

  signUpForm = this.formBuilder.group({
    company: ['', Validators.required],
    logo: ['', Validators.required],
    new: [false, Validators.required],
    featured: [false, Validators.required],
    position: ['', Validators.required],
    role: ['', Validators.required],
    level: ['', Validators.required],
    postedAt: ['', Validators.required],
    contract: ['', Validators.required],
    location: ['', Validators.required],
    UserId: [null, Validators.required],
    skills: this.formBuilder.array([]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private jobsService: JobsService,
    private jobSkillsService: JobSkillsService,
    private skillsService: SkillsService,
    private route: Router,
  ) 
  {}

  onSubmit() {
    this.signUpForm.get('postedAt')?.setValue("1dago");
    this.signUpForm.get('UserId')?.setValue(1);
    if(this.signUpForm.valid) {
      this.addNewJob(this.signUpForm.value);
      // console.table(this.signUpForm.value);
    }
  }

  onAddSkills() {
    const control = this.formBuilder.control('skill');
    this.jobSkills.push(control);
  }

  get jobSkills() {
    return this.signUpForm.get('skills') as FormArray;
  }

  addNewJob(job: JobsModel): void {
      this.jobsService.addJob(job).subscribe((response: JobsModel) => {
      });
      setTimeout(() => {
        this.route.navigate(['/']);
      }, 10)
  }

  ngOnInit(): void {
    this.signUpForm.valueChanges.subscribe((value) => {
      // console.table(value);
    }
    );

    this.jobSkillsService.getAll().subscribe({
      next: (data) => {
        this.jobSkill = data;
        console.log(this.jobSkill)
      },
      error: (e) => console.error(e)
    });

    this.skillsService.getAll()
      .subscribe({
        next: (data) => {
          this.skills = data;
          // console.log(this.skills)
        },
        error: (e) => console.error(e)
      });
  }
}
