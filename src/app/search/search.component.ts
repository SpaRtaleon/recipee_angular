import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { category } from '../home/home.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit{


  constructor( private apiService:ServiceService,private toastr:ToastrService){  }
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
    });

    // this.apiService.getPopularRecipe().subscribe((data) => {
    //   this.popularRecipes = data;
    //   console.log(this.popularRecipes, 'popular');
    // });
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
        this.toastr.error('Something went wrong.. Please try again later!!')
        console.error('Error fetching filtered recipes:', error);
      }
    );
  }
}
