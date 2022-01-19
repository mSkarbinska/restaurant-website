import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "./dishes-data/dish";

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(dishes: Dish[], searchText: string): Dish[] {
    if (!dishes)
      return [];
    if (!searchText)
      return dishes;
    searchText = searchText.toLowerCase();
    return dishes.filter(course => {
      return course.name.toLowerCase().includes(searchText);
    });


  }}
