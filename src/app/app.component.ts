import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private route:ActivatedRoute){

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
}
