import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';

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
      email: ['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      phoneNumber: [''],
      password: ['',Validators.minLength(6)],
      active:[true],
    }); 
  }
  constructor(private formB:FormBuilder,private router:Router,private authService:ServiceService,private toastr:ToastrService){

  }
 
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.toastr.error("Please Fill The Form !");
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
