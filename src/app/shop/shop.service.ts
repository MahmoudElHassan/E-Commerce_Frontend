import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7031/api/';

  constructor(private http: HttpClient) { }

  getProduct(){
    return this.http.get(this.baseUrl + 'Products/GetAllProduct');
  }
}
