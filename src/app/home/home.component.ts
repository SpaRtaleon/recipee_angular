import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceService } from '../service/service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private apiService: ServiceService){
    
  }
  @ViewChild('catslist', { read: ElementRef }) public catslist!: ElementRef<any>;
  @ViewChild('poplist', { read: ElementRef }) public poplist!: ElementRef<any>;
  category!: category[];
  popularRecipes:any;
  recipes:any;
  Searchdata:any;
  ngOnInit() {
    this.apiService.getCategory().subscribe((data:any) => {
      this.category = data;

    });


    this.apiService.getPopularRecipe().subscribe((data)=>{
      this.popularRecipes=data
      console.log(this.popularRecipes,"popular");
    });
    this.apiService.getRecipeAll().subscribe((data)=>{
      this.recipes=data
      console.log(this.recipes,"recipes");
    });
    
  }
  
 scrollRight(element: string) {
  if(element=='catslist')
    this.catslist.nativeElement.scrollTo({ left: (this.catslist.nativeElement.scrollLeft + 200), behavior: 'smooth' });
  if(element=='poplist')
  this.poplist.nativeElement.scrollTo({ left: (this.poplist.nativeElement.scrollLeft + 200), behavior: 'smooth' });
  }

 scrollLeft(element: string) {
  if(element=='catslist')
    this.catslist.nativeElement.scrollTo({ left: (this.catslist.nativeElement.scrollLeft - 200), behavior: 'smooth' });
  if(element=='poplist')
    this.poplist.nativeElement.scrollTo({ left: (this.poplist.nativeElement.scrollLeft - 200), behavior: 'smooth' });
  }

  searchRecipe(Searchdata: any){
    if(Searchdata==''){
      this.apiService.getRecipeAll().subscribe((data)=>{
      this.recipes=data
      console.log(this.recipes,"recipes");
    });
    }
    this.apiService.getRecipebynamel(Searchdata).subscribe((data)=>{
      this.recipes=[];
      this.recipes=data
      console.log(this.recipes.length,"recipes");
    });
    
  }
  
}
export interface category{
  id:Number;
  title:String;
  img:String;
}
