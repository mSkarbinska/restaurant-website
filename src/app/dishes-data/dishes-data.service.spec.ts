import { TestBed } from '@angular/core/testing';

import { DishesDataService } from './dishes-data.service';

describe('DishesDataService', () => {
  let service: DishesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
