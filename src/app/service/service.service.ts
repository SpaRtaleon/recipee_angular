import { Injectable } from '@angular/core';//k8q
import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { category } from '../home/home.component';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }




 private  apiUrl="http://localhost:8000"
    // private  apiUrl="https://recipee-django.vercel.app"



  register(user: any):Observable<any> {
  
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user, { withCredentials: true });
}
getUser() {
  let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const options = { headers: headers, withCredentials: true };
  return this.http.get(`${this.apiUrl}/user`,options);
}

logout() {
  return this.http.post(`${this.apiUrl}/logout`,null,{ withCredentials: true });
}

  getIngredients(): Observable<any[]>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<any[]>(`${this.apiUrl}/recipe/ingredientList`,{headers:headers});
  }

  getCategory(): Observable<category[]> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<category[]>(`${this.apiUrl}/recipe`,{headers:headers});
  }

  getCat(id:Number): Observable<any[]> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<category[]>(`${this.apiUrl}/recipe/getcat/${id}`,{headers:headers});
  }

  getRecipesByCategory(id:Number): Observable<any[]> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<any[]>(`${this.apiUrl}/recipe/${id}`,{headers:headers});
  }

  getPopularRecipe(): Observable<any[]> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<any[]>(`${this.apiUrl}/recipe/popular`,{headers:headers});
  }

  getRecipeAll(): Observable<any[]> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<any[]>(`${this.apiUrl}/recipe/all`,{headers:headers});
  }

  getRecipebynamel(data:any): Observable<any[]> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<any[]>(`${this.apiUrl}/recipe/find/${data}`,{headers:headers});
  }

  getRecipe(id:any): Observable<any[]> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<any[]>(`${this.apiUrl}/recipe/recipeid/${id}`,{headers:headers});
  }
  getRecipesByFilter(queryParams: any): Observable<any[]> {

    let headers = new HttpHeaders();
    const params = new HttpParams({ fromObject: queryParams });
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<any[]>(`${this.apiUrl}/recipe/recipeFilter`, {headers:headers,params:params});
  }
}
