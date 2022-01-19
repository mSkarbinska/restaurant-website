import { Component, OnInit } from '@angular/core';
import {Dish} from "../dishes-data/dish";
import {DishesDataService} from "../dishes-data/dishes-data.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  dish!: Dish;
  id!: number;
  errors: string[] = [];
  index:number =0;
  reviewForm: FormGroup = new FormGroup({
    nick: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    date: new FormControl('')
  });
  constructor(private route: ActivatedRoute, public dishesService: DishesDataService) { }
  nextPhoto(): void {
    this.index++;
    this.index %= this.dish.imgs.length;
  }
  formSubmit(): void {
    this.errors = [];
    let nick: string = this.reviewForm.value.nick;
    let title: string = this.reviewForm.value.title;
    let text: string = this.reviewForm.value.text;
    if (nick.length <= 0) {
      this.errors.push("Nie podano nicku");
    }
    if (title.length <= 0) {
      this.errors.push("Nie podano tytułu");
    }
    if (text.length < 20) {
      this.errors.push("Tekst zbyt krótki, co najmniej 20 znaków");
    }
    if (text.length > 500) {
      this.errors.push("Tekst zbyt długi, maksymalnie 500 znaków");
    }
    if (this.errors.length == 0) {
      this.dishesService.addReview(this.dish, this.reviewForm.value);
      this.reviewForm.reset();
    }
  }
  prevPhoto(): void {
    this.index--;
    if (this.index < 0) {
      this.index = this.dish.imgs.length + this.index;
    }
    else {
      this.index %= this.dish.imgs.length;
    }
  }
  ngOnInit(): void {
    let id: string = this.route.snapshot.params["id"];
    this.dish = this.dishesService.getDish(id);
    this.dish.id = id;
  }

}
