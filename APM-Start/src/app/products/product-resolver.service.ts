import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ProductResolved } from './product';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductResolved> {

  constructor(private productService: ProductService) { }
  
  resolve(route: ActivatedRouteSnapshot, 
          state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = route.paramMap.get('id');
    
    if (isNaN(+id)) {
      const errorMessage = `Product id was not a number: ${id}`;
      console.error(errorMessage);
      return of({product: null, error: errorMessage});
    }

    return this.productService.getProduct(+id)
            .pipe(
              map(product => ({product: product})),
              catchError(error => {
                const errorMessage = `Retrieval error message: ${error}`;
                console.error(errorMessage);
                return of({product: null, message: errorMessage});
              })
            )
  }
}
