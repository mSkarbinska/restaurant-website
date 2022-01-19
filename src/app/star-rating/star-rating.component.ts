import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../dishes-data/dish";

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  @Input() dish!: Dish;
  stars: number[] = [1, 2, 3, 4, 5];
  value: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  rate(star: number): void {
    this.value = star;
    this.dish.rating=star;
  }
}
