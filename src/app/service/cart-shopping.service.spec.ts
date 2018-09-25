import { TestBed } from '@angular/core/testing';

import { CartShoppingService } from './cart-shopping.service';

describe('CartShoppingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartShoppingService = TestBed.get(CartShoppingService);
    expect(service).toBeTruthy();
  });
});
