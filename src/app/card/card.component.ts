import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Dish } from '../dishes-data/dish';
import { DishesDataService } from '../dishes-data/dishes-data.service';
import {Subscription} from "rxjs";
import {CartService} from "../cart.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() dish!: Dish;
  @Output() remove: EventEmitter<Dish> = new EventEmitter<Dish>();
  subscription!: Subscription;
  maxPrice!: number;
  minPrice!: number;
  dishesService: DishesDataService;
  cartService: CartService;
  authService:AuthService;

  constructor(dishesService: DishesDataService, cartService: CartService ,authService: AuthService) {
    this.dishesService = dishesService;
    this.cartService = cartService;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.dishesService.setCurrQuantity(this.dish);
    this.subscription = this.dishesService.getDishes().subscribe(value => {
      this.minPrice = value
        .reduce((prev, current) => (prev.price < current.price) ? prev : current).price;

      this.maxPrice = value
        .reduce((prev, current) => (prev.price > current.price) ? prev : current).price;
    });
    console.log(this.minPrice, this.maxPrice)
  }
  incrementCounter(){
    this.dishesService.incrementCounter(this.dish);
    this.cartService.addDishToCart(this.dish, 1);
  }
  decrementCounter(){
    this.dishesService.decrementCounter(this.dish);
    this.cartService.decreaseDishInCart(this.dish, 1);
  }
  removeDish(): void {

    // @ts-ignore
    this.dishesService.decreaseQuantity(this.dishesService.getCurrCounter(this.dish));

    this.remove.emit(this.dish);
  }
}
