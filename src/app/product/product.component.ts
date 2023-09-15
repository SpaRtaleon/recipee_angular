import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  constructor(private route: ActivatedRoute,private apiService:ServiceService) {}

     id:any;
     recipe :any;
     ingredients:any;
     instructions!:string;
     directions:string[]=[];
     ngOnInit() {
      this.route.params.subscribe(params => {
        const id = params['id']; 
        console.log(id);
        if(id){
          this.apiService.getRecipe(id).subscribe((data:any)=>{
            this.recipe=data.recipe;
            this.ingredients=data.ingredients;
            this.instructions=data.recipe.Recipe_Procedure;
            this.directions=this.instructions.split(".")
             console.log(this.recipe,"recipe");
           });
        }
      });

  
}

}