import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, BasketTotals, IBasket, IBasketItem } from '../shared/_models/basket';
import { IProduct } from '../shared/_models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basurl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null!);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals>(null!);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id:string){
    return this.http.get<IBasket>(this.basurl + 'Basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
        //console.log(this.getCuurrentBasketValue())
      })
    ) 
  };

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.basurl + 'Basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.calculateTotals()
      //console.log(response);
    },error => {
      console.log(error);
    })
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete<IBasket>(this.basurl + "Basket?id=" + basket.id).subscribe(() => {
      this.basketSource.next(null!);
      this.basketTotalSource.next(null!);
      localStorage.removeItem('basket_id');
    },error => {
      console.log(error);
    })
  }

  getCuurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemTOBasketItem(item, quantity);
    const basket = this.getCuurrentBasketValue()! ?? this.createBasket();
    //console.log(basket);
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCuurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  dencrementItemQuantity(item: IBasketItem) {
    const basket = this.getCuurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    }else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCuurrentBasketValue();
    if (basket.items.some(s => s.id === item.id)) {
      basket.items = basket.items.filter(x => x.id !== item.id)
      if (basket.items.length > 0) {
        this.setBasket(basket);
      }else {
        this.deleteBasket(basket);
      }
    }
  }





  private calculateTotals() {
    const basket = this.getCuurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((a,b) => (b.price * b.quantity) + a, 0);
    const total = shipping + subtotal;
    this.basketTotalSource.next({shipping, total, subtotal});
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    //console.log(items);
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }else {
      items[index].quantity += quantity; 
    }
    return items;
  }
  
  private createBasket(): IBasket  {
    const basket = new Basket();
    try{
      localStorage.setItem('basket_id', basket.id);
    }catch (error) {
      console.log(error)
    }
    return basket;
  }

  private mapProductItemTOBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureURL,
      quantity,
      brand: item.productBrand,
      type: item.productType,
      isDelete: item.isDelete
    };
  }
}


