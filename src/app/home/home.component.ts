import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private apiService: ServiceService){
    
  }
  category!:any[];
  ngOnInit() {
    this.apiService.getPosts().subscribe((data: any[]) => {
      this.category = data;
    });
    console.log(this.category,"cate");
  }


  
}
