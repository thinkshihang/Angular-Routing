import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Product, ProductResolved } from '../product';

@Component({
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm, {static: false}) productForm: NgForm;

  errorMessage: string;
  public product: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(
      data => {
        const resolvedProduct: ProductResolved = data['resolvedData'];

        if (this.productForm) {
          this.productForm.reset();
        }
    
        this.errorMessage = resolvedProduct.error;
        this.product = resolvedProduct.product;
      }
    )
  }
}
