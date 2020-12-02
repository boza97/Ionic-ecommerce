import { Injectable } from '@angular/core';
import { Category } from '../common/category';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface CategoriesResponse {
  message: string;
  categories: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _categories = new BehaviorSubject<Category[]>([]);
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public get categories() {
    return this._categories.asObservable();
  }

  getCategories() {
    return this.http
      .get<CategoriesResponse>(this.apiUrl + 'categories')
      .pipe(
        map(response => {
          const categories = [];
          for (const key in response.categories) {
            if (response.categories.hasOwnProperty(key)) {
              const category = response.categories[key];
              categories.push(new Category(
                category.category_id,
                category.name,
                this.apiUrl + category.image
              ));
            }
          }
          return categories;
        }),
        tap(categories => {
          this._categories.next(categories);
        })
      );
  }

  public getCategory(categoryId: number) {
    return this.categories.pipe(take(1), map(categories => {
      return { ...categories.find(c => c.category_id === categoryId) };
    }));
  }
}
