import { TestBed } from '@angular/core/testing';

import { ProductResolverService } from './product-resolver.service';

describe('ProductsResolverService', () => {
  let service: ProductResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
