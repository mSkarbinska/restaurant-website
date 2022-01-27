import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DishesComponent } from './dishes/dishes.component';
import { CardComponent } from './card/card.component';
import { DishFormComponent } from './dish-form/dish-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StarRatingComponent } from './star-rating/star-rating.component';
import { SearchPipePipe } from './search-pipe.pipe';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { AngularFireModule} from "@angular/fire/compat";
import { environment } from '../environments/environment';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DishesComponent,
    CardComponent,
    DishFormComponent,
    StarRatingComponent,
    SearchPipePipe,
    MainComponent,
    ShoppingCartComponent,
    DishDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    PagenotfoundComponent,
    AdminViewComponent,
    ManagerViewComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        ReactiveFormsModule,
        AngularFirestoreModule,
        BrowserAnimationsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
