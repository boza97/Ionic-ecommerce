import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../common/order';
import { OrderItem } from '../common/orderItem';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../common/product';

export interface OrderRequestData {
  contactName: string,
  city: string,
  cityCode: string,
  address: string,
  phone: string,
  products: {
    product_id: number,
    quantity: string
  }[]
}

export interface OrderResponseData {
  order: {
    address: string,
    city: string,
    city_code: number,
    contact_name: string,
    createdAt: string,
    order_id: number,
    phone: string,
    total: string,
    order_items: {
      order_item_id: number
      price: string,
      product: Product,
      quantity: number
    }[]
  },
  status: string
}

export interface OrdersResponseData {
  orders: {
    address: string,
    city: string,
    city_code: number,
    contact_name: string,
    createdAt: string,
    order_id: number,
    phone: string,
    total: string
  }[],
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _orders = new BehaviorSubject<Order[]>([]);
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private http: HttpClient
  ) { }

  get orders() {
    return this._orders.asObservable();
  }

  fetchOrders() {
    let token: string;
    let userId: number;
    return this.authService.user
      .pipe(
        take(1),
        switchMap(user => {
          if (user) {
            token = user.token;
            userId = user.user_id;
            return this.http.get<OrdersResponseData>(this.apiUrl + 'orders',
              { headers: new HttpHeaders().set('Authorization', token) });
          } else
            throw new Error();
        }),
        map(response => {
          const orders = [];
          for (const key in response.orders) {
            if (response.orders.hasOwnProperty(key)) {
              const order = response.orders[key];
              orders.push(new Order(
                order.order_id,
                order.contact_name,
                order.city,
                order.city_code,
                order.address,
                order.phone,
                +order.total,
                userId,
                [],
                new Date(order.createdAt)
              ));
            }
          }
          return orders;
        }),
        tap(orders => {
          this._orders.next(orders);
        })
      );
  }

  fetchOrder(orderId: number) {
    let token: string;
    let userId: number;
    return this.authService.user.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          token = user.token;
          userId = user.user_id;
          return this.http.get<OrderResponseData>(this.apiUrl + 'orders/' + orderId,
            { headers: new HttpHeaders().set('Authorization', token) });
        }
        else
          throw new Error();
      }),
      map(response => {
        const orderItems = [];
        for (const key in response.order.order_items) {
          if (response.order.order_items.hasOwnProperty(key)) {
            const orderItem = response.order.order_items[key];
            orderItem.product.image = this.apiUrl + orderItem.product.image;
            orderItems.push(orderItem);
          }
        }
        const order = new Order(
          response.order.order_id,
          response.order.contact_name,
          response.order.city,
          response.order.city_code,
          response.order.address,
          response.order.phone,
          +response.order.total,
          userId,
          orderItems,
          new Date(response.order.createdAt)
        );
        return order;
      })
    );
  }

  placeOrder(
    contactName: string,
    city: string,
    cityCode: string,
    address: string,
    phone: string) {
    let userId: number;
    let token: string;
    let order: OrderRequestData;
    return this.authService.user
      .pipe(
        take(1),
        switchMap(user => {
          if (user) {
            token = user.token;
            userId = user.user_id;
            return this.cartService.cart;
          } else {
            throw new Error();
          }
        }),
        take(1),
        switchMap(orderItems => {
          if (orderItems && orderItems.length > 0) {
            const products = this.createProductsArray(orderItems);
            order = {
              contactName: contactName,
              city: city,
              cityCode: cityCode,
              address: address,
              phone: phone,
              products: products
            };
            return this.http.post(this.apiUrl + 'orders',
              order, { headers: new HttpHeaders().set('Authorization', token) });
          } else {
            throw new Error();
          }
        })
      );
  }

  private createProductsArray(orderItems: OrderItem[]) {
    let products = [];
    let counter = 0;
    orderItems.forEach(orderItem => {
      products[counter++] = {
        product_id: orderItem.product.product_id,
        quantity: orderItem.quantity.toString()
      }
    });
    return products;
  }
}
