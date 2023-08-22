import { Injectable } from '@angular/core';//k8q
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { category } from '../home/home.component';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }




  apiUrl="http://localhost:8000"
  getCategory(): Observable<category[]> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<category[]>(`${this.apiUrl}/recipe`,{headers:headers});
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

}
