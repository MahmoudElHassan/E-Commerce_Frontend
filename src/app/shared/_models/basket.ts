import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
    id: string
    items: IBasketItem[];
}

export interface IBasketItem {
    isDelete: boolean
    id: number
    productName: string
    price: number
    quantity: number
    pictureUrl: string
    brand: string
    type: string
}

export class Basket implements Basket {
    id = uuidv4();
    items: IBasketItem[] = [];
    //shippingPrice = 0;
}

export interface BasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}