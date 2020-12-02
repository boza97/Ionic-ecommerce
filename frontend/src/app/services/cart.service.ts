import { Injectable} from "@angular/core";
import { BehaviorSubject, from } from "rxjs";
import { take, tap, map, switchMap } from "rxjs/operators";
import { Plugins } from "@capacitor/core";
import { Product } from "../common/product";
import { OrderItem } from "../common/orderItem";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root",
})
export class CartService {
  private _cart = new BehaviorSubject<OrderItem[]>([]);

  constructor(
    private authService: AuthService) { }

  get cart() {
    return this._cart.asObservable();
  }

  clearCart() {
    return this.authService.userId.pipe(
      take(1),
      tap(userId => {
        Plugins.Storage.remove({ key: 'cart' + userId });
        this._cart.next([]);
      })
    );
  }

  fetchCart() {
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        return from(Plugins.Storage.get({ key: 'cart' + userId }));
      }),
      take(1),
      map(cartData => {
        if (!cartData || !cartData.value) {
          return [];
        }
        const cart = JSON.parse(cartData.value);
        return cart;
      }),
      tap(cart => {
        this._cart.next(cart);
      })
    );
  }

  addToCart(product: Product) {
    let fetchedUserId: number;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.cart;
      }),
      take(1),
      tap(cart => {
        const newOrderItem = new OrderItem(Math.random(), product, 1, product.price);
        if (!cart.find((oi) => oi.product.product_id === newOrderItem.product.product_id)) {
          const newCart = cart.concat(newOrderItem);
          this.storeCart(newCart, fetchedUserId);
          this._cart.next(newCart);
        } else {
          throw new Error("Proizvod je već dodat u korpu.");
        }
      })
    );
  }

  deleteFromCart(productId: number) {
    let fetchedUserId: number;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.cart;
      }),
      take(1),
      tap(cart => {
        const newCart = cart.filter((oi) => oi.product.product_id !== productId);
        if (newCart.length === 0) {
          Plugins.Storage.remove({ key: 'cart' + fetchedUserId });
          this._cart.next([]);
        } else {
          this.storeCart(newCart, fetchedUserId);
          this._cart.next(newCart);
        }
      })
    );
  }

  decreaseOrderItem(id: number) {
    let fetchedUserId: number;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.cart;
      }),
      take(1),
      tap((cart) => {
        const oi = cart.find((oi) => oi.product.product_id === id);
        if (oi.quantity !== 1) {
          oi.quantity--;
          oi.amount = oi.quantity * oi.product.price;
          this.storeCart(cart, fetchedUserId);
          this._cart.next(cart);
        }
      })
    );
  }

  increaseOrderItem(id: number) {
    let fetchedUserId: number;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.cart;
      }),
      take(1),
      tap((cart) => {
        const oi = cart.find((oi) => oi.product.product_id === id);
        if (oi.quantity !== oi.product.quantity) {
          oi.quantity++;
          oi.amount = oi.quantity * oi.product.price;
          this.storeCart(cart, fetchedUserId);
          this._cart.next(cart);
        }
      })
    );
  }

  private storeCart(cart: OrderItem[], userId: number) {
    const data = JSON.stringify(cart);
    Plugins.Storage.set({ key: 'cart' + userId, value: data });
  }
}
