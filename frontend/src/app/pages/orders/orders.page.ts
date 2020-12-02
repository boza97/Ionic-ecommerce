import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../../common/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
  loadedOrders: Order[];
  isLoading = false;
  private ordersSub: Subscription;

  constructor(
    private ordersService: OrderService,
    private navCtrl: NavController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.isLoading = true;
    this.ordersSub = this.ordersService.orders.subscribe(orders => {
      this.loadedOrders = orders;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.ordersService.fetchOrders().subscribe(
      () => { },
      error => {
        this.alertCtrl
          .create({
            header: 'Greška',
            message: 'Greška prilikom učitavanja podataka.',
            buttons: ['Ok']
          })
          .then(alertEl => {
            alertEl.present();
            this.isLoading = false;
          })
      }
    );
  }

  ngOnDestroy(): void {
    if (this.ordersSub) {
      this.ordersSub.unsubscribe();
    }
  }

  onCancelOrder(orderId: number) {
    console.log(orderId);
  }

  onShowOrder(orderId: number) {
    this.navCtrl.navigateForward('/orders/order-details/' + orderId);
  }

}
