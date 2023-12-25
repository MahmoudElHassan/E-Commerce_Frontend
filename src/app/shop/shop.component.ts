import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/_models/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products!: IProduct[];

  constructor(private shopServices: ShopService){}

  ngOnInit(): void {
    this.shopServices.getProduct().subscribe((response: any) => {
      this.products = response;
      console.log(this.products)
    }, error => {
      console.log(error)
    });
  
  }




}
