import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Dish } from '../dishes-data/dish';
import { DishesDataService } from '../dishes-data/dishes-data.service';@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() dish!: Dish;
  @Output() remove: EventEmitter<Dish> = new EventEmitter<Dish>();

  dishesService: DishesDataService;

  constructor(dishesService: DishesDataService ) {
    this.dishesService=dishesService;
  }

  ngOnInit(): void {
    this.dishesService.setCurrQuantity(this.dish);
  }

  removeDish(): void {

    // @ts-ignore
    this.dishesService.decreaseQuantity(this.dishesService.getCurrCounter(this.dish));

    this.remove.emit(this.dish);
  }
}
