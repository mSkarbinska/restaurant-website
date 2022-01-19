import {Review} from "./review";

export interface Dish {
    id:string;
    name: string;
    cuisine: string;
    type: string;
    category:string;
    ingredients: string[];
    quantity:number;
    price: number;
    description: string;
    imgs:string[];
    rating: number;
    reviews: Review[];
    active: boolean;
}
