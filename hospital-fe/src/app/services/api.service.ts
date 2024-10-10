import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  localUrl = 'http://localhost:7200/';

  constructor(public httpClient: HttpClient) {}

  get<Type>(path: string): Observable<Type> {
    return this.httpClient.get<Type>(this.localUrl + path);
  }

  post<Type>(path: string, object: Type): Observable<Type> {
    return this.httpClient.post<Type>(this.localUrl + path, object);
  }

  put<Type>(path: string, object: Type): Observable<Type> {
    return this.httpClient.put<Type>(this.localUrl + path, object);
  }

  delete<Type>(path: string): Observable<Type> {
    return this.httpClient.delete<Type>(this.localUrl + path);
  }
}
