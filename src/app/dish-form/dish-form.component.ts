import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {DishesDataService} from "../dishes-data/dishes-data.service";
@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent implements OnInit {
  newDish = new FormGroup({
    name: new FormControl(''),
    cuisine:  new FormControl(''),
    type: new FormControl(''),
    category: new FormControl(''),
    ingredients: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    imgs: new FormControl(''),
  });

  dishesService: DishesDataService;

  constructor(dishesService: DishesDataService) {
    this.dishesService=dishesService;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.dishesService.addDish(this.newDish.value);
    this.newDish.reset();
  }
}
