import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private formB:FormBuilder,private authService:ServiceService,private router:Router){

  }
  loginForm!:FormGroup;
  submitted=false;
  loading=false;
  ngOnInit() {
    this.loginForm = this.formB.group({
      email: [''],
      password: ['', [Validators.required]],

    }); 
  }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    console.log('this.loginForm.invalid',this.loginForm.invalid);
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value)
        .subscribe(
            (data:any) => {
                console.log('logindata',data);
                this.router.navigate(['']);
                localStorage.setItem('token',data.token)
            },
            error => {
              console.log('error',error);
                this.loading = false;
            });
  }

  
}
