import { Component, OnInit } from '@angular/core';
import {Dish} from "../dishes-data/dish";
import {CartService} from "../cart.service";
import {DishesDataService} from "../dishes-data/dishes-data.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  totalPrices!: Map<Dish, number>;

  constructor(public cartService: CartService, public dishesService: DishesDataService) { }

  ngOnInit(): void {
  }
}
