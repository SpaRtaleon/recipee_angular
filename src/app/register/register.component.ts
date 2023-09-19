import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  registerForm!:FormGroup;
  loading=false;
  submitted=false;

  ngOnInit() {
    this.registerForm = this.formB.group({
      username: [''],
      email: [''],
      phoneNumber: [''],
      password: ['', [Validators.required]],
      active:[true],
    }); 
  }
  constructor(private formB:FormBuilder,private router:Router,private authService:ServiceService){

  }
 
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value)
        .subscribe(
            data => {
                this.router.navigate(['/login']);
            },
            error => {
             
                this.loading = false;
            });
}
}
