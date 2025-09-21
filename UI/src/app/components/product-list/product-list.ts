import { Component, computed, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductFilter } from '../../models/productFilter.model';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

type VoidFunction = () => void;

@Component({
  selector: 'app-product-list',
  imports: [MatPaginatorModule, RouterModule, CurrencyPipe, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  pageSizeOptions: number[] = [8, 16, 24, 32];
  products: Product[] | undefined;
  units: string[] | undefined;
  filter: ProductFilter = {
    sortBy: '',
    unit: '',
    pagination: {
      currentPage: 1,
      pageSize: this.pageSizeOptions[0],
      totalItems: 0,
    },
  };

  constructor(private productService: ProductService, public cartService: CartService, private route: ActivatedRoute) {
    this.loadProducts(() => (this.units = this.products ? Array.from(new Set(this.products.map((p) => p.unit))) : []));
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filter.name = params['name'];
      this.loadProducts();
    });
  }

  loadProducts(callBack: VoidFunction = () => {}) {
    let query = `?`;
    if (this.filter.name) query += `&name=${this.filter.name}`;
    if (this.filter.minPrice) query += `&minPrice=${this.filter.minPrice}`;
    if (this.filter.maxPrice) query += `&maxPrice=${this.filter.maxPrice}`;
    if (this.filter.unit) query += `&unit=${this.filter.unit}`;
    if (this.filter.sortBy) query += `&sortBy=${this.filter.sortBy}`;

    this.productService.getProducts(query).subscribe((items) => {
      const start = (this.filter.pagination.currentPage - 1) * this.filter.pagination.pageSize;
      const end = start + this.filter.pagination.pageSize;
      this.products = items.slice(start, end + 1 > this.filter.pagination.totalItems ? undefined : end);
      this.filter.pagination.totalItems = items.length;

      callBack();
    });
  }

  onPageChange(event: PageEvent) {
    this.filter.pagination.currentPage = event.pageIndex + 1;
    this.filter.pagination.pageSize = event.pageSize;
    this.loadProducts();
  }

  resetFilters() {
    this.filter = { sortBy: '', unit: '', pagination: { currentPage: 1, pageSize: 10, totalItems: 0 } };
    this.loadProducts();
  }
}
