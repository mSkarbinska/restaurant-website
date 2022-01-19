import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dish } from '../dishes-data/dish';
import { DishesComponent } from './dishes.component';

describe('DishesComponent', () => {
  let component: DishesComponent;
  let fixture: ComponentFixture<DishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
