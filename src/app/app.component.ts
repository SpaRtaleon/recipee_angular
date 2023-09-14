import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from './service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private route:ActivatedRoute,private apiService:ServiceService){

  }

get token(){
return localStorage.getItem('token');
}
  ngOnInit() {

   
    console.log(this.route.parent);
    
  }
  title = 'recipee';
  toolbar(){
    
  }

  logout(){
    this.apiService.logout()
    .subscribe(res=>{
      console.log('reslogout',res);
      localStorage.removeItem('token');
    })
  }
}
