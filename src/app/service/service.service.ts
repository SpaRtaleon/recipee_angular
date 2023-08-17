import { Injectable } from '@angular/core';//k8q
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }




  apiUrl="https://recipee.azurewebsites.net"
  getPosts(): Observable<any[]> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<any[]>(`${this.apiUrl}/recipe`,{headers:headers});
  }
}
