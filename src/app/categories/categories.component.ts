import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private route: ActivatedRoute,private apiService:ServiceService) {}
  recipes:any;
  category:any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      if(id){
        this.apiService.getCat(id).subscribe((data)=>{
          this.category=data
        });
        this.apiService.getRecipesByCategory(id).subscribe((data)=>{
          this.recipes=data
        });
      }
    });
    
    

  }
}
