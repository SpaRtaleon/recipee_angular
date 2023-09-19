import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private apiService: ServiceService,
    private formBuilder: FormBuilder
  ) {}
  @ViewChild('catslist', { read: ElementRef })
  public catslist!: ElementRef<any>;
  @ViewChild('poplist', { read: ElementRef }) public poplist!: ElementRef<any>;


  category!: category[];
  popularRecipes: any;
  recipes: any;
  Searchdata: any;
  ingredientList: any;
  ingredients: string[] = [];
  categories: string[] = [];
  searchQuery: string = '';


  ngOnInit() {
    this.apiService.getCategory().subscribe((data: any) => {
      this.category = data;

    });

    this.apiService.getPopularRecipe().subscribe((data) => {
      this.popularRecipes = data;
     
    });
    this.apiService.getRecipeAll().subscribe((data) => {
      this.recipes = data;
    });
    this.getIngedients();


  }

  clear(){
    this.ingredients=[];
    this.categories=[];
    this.searchQuery='';
    this.apiService.getRecipeAll().subscribe((data) => {
      this.recipes = data;
     
    });
  }
  getIngedients() {
    this.apiService.getIngredients().subscribe((data: any) => {
      this.ingredientList = data;
    });
  }


  filterRecipes() {
    const queryParams: any = {};

    if (this.ingredients?.length > 0) {
      queryParams.ingredient = this.ingredients.join(',');
      
    }

    if (this.categories?.length > 0) {
      queryParams.category = this.categories.join(',');
    }

    if (this.searchQuery.trim() !== '') {
      queryParams.name = this.searchQuery;
    }

    this.apiService.getRecipesByFilter(queryParams).subscribe(
      (response: any) => {
        this.recipes = response;
      },
      (error) => {
        console.error('Error fetching filtered recipes:', error);
      }
    );
  }
  scrollRight(element: string) {
    if (element == 'catslist')
      this.catslist.nativeElement.scrollTo({
        left: this.catslist.nativeElement.scrollLeft + 200,
        behavior: 'smooth',
      });
    if (element == 'poplist')
      this.poplist.nativeElement.scrollTo({
        left: this.poplist.nativeElement.scrollLeft + 200,
        behavior: 'smooth',
      });
  }

  scrollLeft(element: string) {
    if (element == 'catslist')
      this.catslist.nativeElement.scrollTo({
        left: this.catslist.nativeElement.scrollLeft - 200,
        behavior: 'smooth',
      });
    if (element == 'poplist')
      this.poplist.nativeElement.scrollTo({
        left: this.poplist.nativeElement.scrollLeft - 200,
        behavior: 'smooth',
      });
  }

  searchRecipe(Searchdata: any) {
    if (Searchdata == '') {
      this.apiService.getRecipeAll().subscribe((data) => {
        this.recipes = data;
      
      });
    }
    this.apiService.getRecipebynamel(Searchdata).subscribe((data) => {
      this.recipes = [];
      this.recipes = data;
    
    });
  }
}
export interface category {
  id: Number;
  title: String;
  img: String;
  active:boolean;
  desc:string
}
