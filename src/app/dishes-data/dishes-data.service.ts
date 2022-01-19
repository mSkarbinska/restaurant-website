import { Injectable} from '@angular/core';
import { Dish } from './dish';
import {Review} from "./review";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})

export class DishesDataService {
  db: any;
  dishes: Observable<Dish[]>;
  // minusIsDisabled: boolean[];
  // plusIsDisabled: boolean[];
  currQuantity: Map<string, number> = new Map<string, number>();
  reviews: Map<string, Review[]> = new Map<string, Review[]>();
  currCurrency: string = 'USD';
  currencyRate:number = 1;
  totalQuantity: number = 0;

  constructor(db: AngularFirestore) {
    this.db = db;
    this.dishes = this.db.collectionGroup("dishes").valueChanges({idField: "id"});

    // this.minusIsDisabled= this.dishes.map(()=>{return true});
    // this.plusIsDisabled = this.dishes.map((dish)=>{return dish.quantity<1});
  }

  getDishes(): Observable<Dish[]> {
    return this.dishes;
  }


  // addDish(newDish:any){
  //   this.db.collection("dishes").add({name: newDish.name,
  //     id: this.dishes.length,
  //     cuisine: newDish.cuisine,
  //     type: newDish.type,
  //     category: newDish.category,
  //     ingredients: newDish.ingredients.trim().split(","),
  //     quantity: newDish.quantity,
  //     rating: 0,
  //     description: newDish.description,
  //     price: newDish.price,
  //     imgs: newDish.imgs.trim().split(","),
  //     reviews: []
  //   }).then(
  //     this.dishesCurrQuantity.push(0)
  //   );

  // }
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
    this.currQuantity.set(dish.id, tmp + 1);
    console.log("sdgf");
  }

  updateDish(id: string, dish: Dish) {
    this.db.collection("dishes").doc(id).update(dish);
  }

  incrementCounter(dish:Dish){
    if (this.currQuantity.get(dish.id) == undefined) {
      this.currQuantity.set(dish.id, 1);
    }
    else {
      // @ts-ignore
      let tmp: number = this.currQuantity.get(dish.id);
      this.currQuantity.set(dish.id, tmp - 1);
    }
  }
  increaseQuantity(i: number): void {
    this.totalQuantity += i;
  }

  decreaseQuantity(i: number): void {
    this.totalQuantity -= i;
  }
  // disablePlus(dish:Dish){
  //   this.plusIsDisabled[dish.id]=!this.plusIsDisabled[dish.id];
  // }
  //
  // disableMinus(dish:Dish){
  //   this.minusIsDisabled[dish.id]=!this.minusIsDisabled[dish.id];
  // }
  //
  // isPlusDisabled(dish:Dish){
  //   return this.plusIsDisabled[dish.id];
  // }
  //
  // isMinusDisabled(dish:Dish){
  //   return this.minusIsDisabled[dish.id];
  // }
  //
  // getMostExpensive(){
  //   let highestPrice = Math.max.apply(null, this.dishes.map(e => e.price));
  //   return this.dishes.find(e => e.price === highestPrice);
  // }
  //
  // getCheapest(){
  //   let lowestPrice = Math.min.apply(null, this.dishes.map(e => e.price));
  //   return this.dishes.find(e => e.price === lowestPrice);
  // }
  //
  // remove(dish: Dish): void {
  //   let index: number = this.dishes.indexOf(dish);
  //   this.dishes.splice(index, 1);
  // }
  removeDish(dish: Dish): void {
    this.currQuantity.delete(dish.id);
    dish.active = false;
    this.db.collection("dishes").doc(String(dish.id)).update(dish);
  }
  // addReview(dish: Dish, newReview: any) {
  //   let review: Review = {
  //     owner: newReview.nick,
  //     title: newReview.title,
  //     text: newReview.text,
  //     date: newReview.date,
  //   };
  //   dish.reviews.push(review);
  // }
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

  getDish(id: string) {
    return this.db.collection("dishes").doc(id).valueChanges();
  }
}
