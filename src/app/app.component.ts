import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Console, error } from 'console';
import { response } from 'express';
import { IProduct } from './_models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'e-commerce';
  products!: IProduct[];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.http.get('https://localhost:7031/api/Products/GetAllProduct').subscribe((response: any) => {
      this.products = response;
      console.log(this.products)
    }, error => {
      console.log(error)
    });
  }
}
