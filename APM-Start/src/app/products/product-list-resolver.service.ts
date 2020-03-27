import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ProductListResolved } from './product';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolverService implements Resolve<ProductListResolved> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, 
          state: RouterStateSnapshot): Observable<ProductListResolved> {
    return this.productService.getProducts()
            .pipe(
              map(products => ({products: products})),
              catchError(error => {
                const errorMessage = `Retrieval error message: ${error}`;
                console.error(errorMessage);
                return of({products: null, message: errorMessage});
              })
            )
  }
}
