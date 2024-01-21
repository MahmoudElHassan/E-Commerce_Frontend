import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/_models/product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  product!: IProduct;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private bcServices: BreadcrumbService){
    bcServices.set('@productDetails', '');
  }

  ngOnInit() { 
    this.loadProduct(); 
  }


  loadProduct(){
    let id = +this.activatedRoute.snapshot.params['id'];
    this.shopService.getProduct(id).subscribe(product => {
      this.product = product;
      this.bcServices.set('@productDetails', product.name)
      // console.log(product);
    }, error => {
      console.log(error);
    }
    )
  }

}
function Params(error: any): void {
  throw new Error('Function not implemented.');
}

