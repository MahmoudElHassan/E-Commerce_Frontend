import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/_models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit{
  basket$!: Observable<IBasket>;

  constructor(private basketService: BasketService) {}
  
  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    console.log(this.basket$)
  }

  incrementQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  dencrementQuantity(item: IBasketItem) {
    this.basketService.dencrementItemQuantity(item);
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }
}
