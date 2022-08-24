import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { JobsService } from '../services/jobs.service';
import { JobSkillsService } from '../services/job-skills.service';
import { SkillsService } from '../services/skills.service';

import { JobsModel } from '../models/jobs.model';
import { JobSkillsModel } from '../models/job-skills.model';
import { SkillsModel } from '../models/skills.model';
import { UsersModel } from '../models/users.model';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css'],
})
export class UpdateJobComponent implements OnInit, AfterViewInit {
  @Input() users?: UsersModel[];
  @Input() jobSkill?: JobSkillsModel[];
  @Input() skills?: SkillsModel[];
  jobId: number;
  job: JobsModel;

  updateJob = this.formBuilder.group({
    id: [null, Validators.required],
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
    private route: Router
  ) {}

  onSubmit() {
    this.updateJob.get('postedAt')?.setValue('1dago');
    this.updateJob.get('UserId')?.setValue(this.job.UserId);
    if (this.updateJob.valid) {
      this.editJob(this.updateJob.value);
    }
  }

  onAddSkills() {
    const control = this.formBuilder.control('skill');
    this.jobSkills.push(control);
  }

  onSkills(skill: string) {
    const control = this.formBuilder.control(skill);
    this.jobSkills.push(control);
  }

  get jobSkills() {
    return this.updateJob.get('skills') as FormArray;
  }

  editJob(job: JobsModel): void {
    this.jobsService.editJob(job).subscribe((response: JobsModel) => {
      console.log("Edit job", response);
    });
    setTimeout(() => {
      this.route.navigate(['/']);
    }, 10)
  }
  
  retrieveUsers(): void {
    this.jobsService.getAll().subscribe({
      next: (data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id == this.jobId) {
            this.job = data[i];
            this.job.Skills.forEach((skill) => {
              this.onSkills(skill.name);
            });
            this.updateJob.patchValue({
              id:       this.job.id,
              company:  this.job.company,
              logo:     this.job.logo,
              new:      this.job.new,
              featured: this.job.featured,
              position: this.job.position,
              role:     this.job.role,
              level:    this.job.level,
              postedAt: this.job.postedAt,
              contract: this.job.contract,
              location: this.job.location,
              UserId:   this.job.UserId,
            });
            break;
          }
        }
      },
      error: (e) => console.error(e),
    });
  }
  ngAfterViewInit(): void {
    this.retrieveUsers();
  }

  ngOnInit(): void {
    this.updateJob.valueChanges.subscribe((value) => {});
    this.jobId = this.jobsService.currentJobId;

    this.jobSkillsService.getAll().subscribe({
      next: (data) => {
        this.jobSkill = data;
      },
      error: (e) => console.error(e)
    });

    this.skillsService.getAll()
      .subscribe({
        next: (data) => {
          this.skills = data;
        },
        error: (e) => console.error(e)
      });
  }

  
}
