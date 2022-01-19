import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Dish} from "../dishes-data/dish";
import {DishesDataService} from "../dishes-data/dishes-data.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DishesComponent implements OnInit {
  // @ts-ignore
  dishes: Observable<Dish[]>;
  perPage: number = 6;
  currPage: number = 0;

  constructor(public dishesService: DishesDataService ) {
  }

  getDishes(){
    this.dishes=this.dishesService.getDishes();
  }

  createRange(): number[] {
    let result: number[] = [];
    for (let i: number = 0; i<this.perPage; i++) {
      result.push(i);
    }

    return result;
  }

  previousPage(): void {
    this.currPage--;
  }

  nextPage(): void {
    this.currPage++;
  }

  ngOnInit(): void {

    this.getDishes();
  }

  removeDish(dish: Dish): void {
    this.dishesService.removeDish(dish);
  }
}
