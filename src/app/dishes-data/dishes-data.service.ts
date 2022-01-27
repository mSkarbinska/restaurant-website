import { Injectable} from '@angular/core';
import { Dish } from './dish';
import {Review} from "./review";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})

export class DishesDataService {
  db: any;
  dishes: Observable<Dish[]>;
  currQuantity: Map<string, number> = new Map<string, number>();
  reviews: Map<string, Review[]> = new Map<string, Review[]>();
  currCurrency: string = 'USD';
  currencyRate:number = 1;
  totalQuantity: number = 0;

  constructor(db: AngularFirestore) {
    this.db = db;
    this.dishes = this.db.collectionGroup("dishes").valueChanges({idField: "id"});
  }

  getDishes(): Observable<Dish[]> {
    return this.dishes;
  }

  addDish(newDish: any): void {
    this.db.collection("dishes").add({
      name: newDish.name,
      cuisine: newDish.cuisine,
      type: newDish.type,
      category: newDish.category,
      ingredients: newDish.ingredients.split(","),
      quantity: parseInt(newDish.quantity),
      description: newDish.description,
      price: parseFloat(newDish.price),
      rating: 0,
      imgs: newDish.imgs.split(","),
      reviews: [],
    })
      .then((docRef: { id: string; }) => {
        this.currQuantity.set(docRef.id, 0)
      });
  }

  // getCheapest(){
  //   return this.getDishes().subscribe(x => x.filter((item, op) =>  op > item.price ? op : item.price, 0));
  // }

  // getMostExpensive(): Observable<Dish[]>{
  //   return this.getDishes().pipe(map(x => x.filter((item, op) =>op < item.price ? op : item.price, 0)));
  // }

  setCurrQuantity(dish: Dish): void {
    if (this.currQuantity.get(dish.id) == undefined) {
      this.currQuantity.set(dish.id, 0);
    }
  }

  changeCurrency(){
    if(this.currCurrency==='USD'){
      this.currCurrency='EUR';
      this.currencyRate = 0.89;
    }
    else if(this.currCurrency==='EUR'){
      this.currCurrency='USD';
      this.currencyRate = 1.13;
    }
  }

  getCurrCounter(dish:Dish){
    // @ts-ignore
    return this.currQuantity.get(dish.id);
  }


  decrementCounter(dish: Dish){
    // @ts-ignore
    let tmp: number = this.currQuantity.get(dish.id);
    this.currQuantity.set(dish.id, tmp - 1);
    this.decreaseQuantity(1);
  }

  updateDish(dish: Dish) {
    this.db.collection("dishes").doc(dish.id).update(dish);
  }

  incrementCounter(dish:Dish){
    if (this.currQuantity.get(dish.id) == undefined) {
      this.currQuantity.set(dish.id, 1);
    }
    else {
      // @ts-ignore
      let tmp: number = this.currQuantity.get(dish.id);
      this.currQuantity.set(dish.id, tmp + 1);
    }
    this.increaseQuantity(1);
  }

  increaseQuantity(i: number): void {
    this.totalQuantity += i;
  }

  decreaseQuantity(i: number): void {
    this.totalQuantity -= i;
  }

  removeDish(dish: Dish): void {
    this.currQuantity.delete(dish.id);
    dish.active = false;
    this.updateDish(dish);
  }

  addReview(dish: Dish, newReview: any): void {
    let review: Review = {
      owner: newReview.nick,
      title: newReview.title,
      text: newReview.text,
      date: newReview.date,
    };

    dish.reviews.push(review);

    if (this.reviews.get(dish.id) == undefined) {
      let newArr: Review[] = [];
      newArr.push(review);
      this.reviews.set(dish.id, newArr);
    }
    else {
      // @ts-ignore
      let arr: Review[] = this.reviews.get(dish.id);
      arr.push(review);
      this.reviews.set(dish.id, arr);
    }
  }

  getDish(id: string): Observable<Dish>{
    console.log('getDish')
    return this.db.collection("dishes").doc(id).valueChanges();
  }
}
