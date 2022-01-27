import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DishesComponent} from "./dishes/dishes.component";
import {MainComponent} from "./main/main.component";
import {DishFormComponent} from "./dish-form/dish-form.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {DishDetailsComponent} from "./dish-details/dish-details.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {PagenotfoundComponent} from "./pagenotfound/pagenotfound.component";

const routes: Routes = [
  {path: '', component:MainComponent},
  {path:'dishes', component:DishesComponent},
  {path:'dish-form', component:DishFormComponent},
  {path: 'shopping-cart', component:ShoppingCartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component:RegistrationComponent},
  {path: "dish-details/:id", component: DishDetailsComponent},
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
