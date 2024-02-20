import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/_models/basket';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  basket$!: Observable<IBasket>;

  constructor(private basketService: BasketService) {}
  
  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  } 

}
