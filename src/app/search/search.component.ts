import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { category } from '../home/home.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit{


  constructor( private apiService:ServiceService){  }
  recipes:any;
  Searchdata: any;
  ingredientList: any;
  ingredients: string[] = [];
  categories: string[] = [];
  searchQuery: string = '';
  category!: category[];


  ngOnInit() {
    this.apiService.getCategory().subscribe((data: any) => {
      this.category = data;
      console.log(this.category);
    });

    // this.apiService.getPopularRecipe().subscribe((data) => {
    //   this.popularRecipes = data;
    //   console.log(this.popularRecipes, 'popular');
    // });
    // this.apiService.getRecipeAll().subscribe((data) => {
    //   this.recipes = data;
    //   console.log(this.recipes, 'recipes');
    // });
    this.getIngedients();


  }


  clear(){
    this.ingredients=[];
    this.categories=[];
    this.searchQuery='';
    this.apiService.getRecipeAll().subscribe((data) => {
      this.recipes = data;
      console.log(this.recipes, 'recipes');
    });
  }
  getIngedients() {
    this.apiService.getIngredients().subscribe((data: any) => {
      this.ingredientList = data;
      console.log(this.ingredientList, 'ingredients');
      console.log(data, 'data');
    });
  }


  filterRecipes() {
    const queryParams: any = {};

    if (this.ingredients?.length > 0) {
      queryParams.ingredient = this.ingredients.join(',');
      console.log(queryParams.ingredient, 'queeryparaingre');
    }

    if (this.categories?.length > 0) {
      queryParams.category = this.categories.join(',');
      console.log(queryParams.category, 'queeryparaingre');
    }

    if (this.searchQuery.trim() !== '') {
      queryParams.name = this.searchQuery;
      console.log(queryParams.name, 'queeryparaingre');
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
}
