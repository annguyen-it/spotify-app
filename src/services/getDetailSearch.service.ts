import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDetailSearchService {

  
constructor(
  private http:HttpClient ,
) { }
getDetailSearch(): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };
  return this.http.get(`https://api.spotify.com/v1/browse/categories?&limit=40&offset=5`, httpOptions);
  };
  getDetailSearchTop(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get(`https://api.spotify.com/v1/browse/categories?&limit=3`, httpOptions);
    };
}
