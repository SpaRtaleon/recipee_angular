import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  

  constructor(private formB:FormBuilder,private authService:ServiceService,private router:Router,private toastr: ToastrService){

  }
  userdata: any;
  loginForm!:FormGroup;
  submitted=false;
  loading=false;
  get f() { return this.loginForm.controls; }
  ngOnInit() {
    this.loginForm = this.formB.group({
      email: ['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      password: [''],

    }); 

    
  }

  onSubmit(){
    this.submitted = true;
    console.log('this.f',this.f);
    // stop here if form is invalid
    console.log('this.loginForm.invalid',this.loginForm.invalid);
   
    if (this.loginForm.invalid) {
      this.toastr.error("Please Fill The Form !");
        return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value)
        .subscribe(
            (data:any) => {
              this.toastr.success('Login Success !');
                this.authService.getUser()
                .subscribe((data:any)=>{
                  this.userdata=data;
                  
                  localStorage.setItem('userData',JSON.stringify(this.userdata));
                })
               
              
                this.router.navigate(['']);
                localStorage.setItem('token',data.token);

            },
            httpErrorResponse => {
              this.toastr.error(httpErrorResponse.error.detail);
                this.loading = false;
            });
  }

  
}
