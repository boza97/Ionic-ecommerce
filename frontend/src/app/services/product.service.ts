import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { BehaviorSubject, pipe } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface ProductsResponse {
  status: string;
  products: Product[];
}

interface ProductResponse {
  status: string;
  product: Product;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _products = new BehaviorSubject<Product[]>([]);
  private _featuredProducts = new BehaviorSubject<Product[]>([]);
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public get products() {
    return this._products.asObservable();
  }

  public get featuredProducts() {
    return this._featuredProducts.asObservable();
  }

  getFeaturedProducts() {
    return this.http
      .get<ProductsResponse>(this.apiUrl + 'products/featured')
      .pipe(
        map(response => {
          const featuredProducts = [];
          for (const key in response.products) {
            if (response.products.hasOwnProperty(key)) {
              const product = response.products[key];
              featuredProducts.push(new Product(
                product.product_id,
                product.title,
                +product.price,
                product.brand,
                product.category,
                this.apiUrl + product.image,
                product.description,
                product.featured,
                product.quantity
              ));
            }
          }
          return featuredProducts;
        }),
        tap(featuredProducts => {
          this._featuredProducts.next(featuredProducts);
        }));
  }

  public getProduct(productId: number) {
    return this.http
      .get<ProductResponse>(this.apiUrl + 'products/' + productId)
      .pipe(
        map(response => {
          const product = response.product;
          product.image = this.apiUrl + product.image;
          product.category.image = this.apiUrl + product.category.image;
          product.price = +product.price;
          return product;
        }));
  }

  public getProductsByCategory(categoryId: number) {
    return this.http
      .get<ProductsResponse>(this.apiUrl + 'categories/' + categoryId + '/products')
      .pipe(map(response => {
        const products = [];
        for (const key in response.products) {
          if (response.products.hasOwnProperty(key)) {
            const product = response.products[key];
            products.push(new Product(
              product.product_id,
              product.title,
              +product.price,
              product.brand,
              product.category,
              this.apiUrl + product.image,
              product.description,
              product.featured,
              product.quantity
            ));
          }
        }
        return products;
      }),
        tap(products => {
          this._products.next(products);
        }));
  }

}
