import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { NavController, AlertController } from '@ionic/angular';
import { Order } from 'src/app/common/order';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit, OnDestroy {
  order: Order;
  isLoading = false;
  private orderSub: Subscription;

  constructor(
    private ordersService: OrderService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('orderId')) {
        this.navCtrl.navigateBack('/orders');
      }

      const orderId = +paramMap.get('orderId');
      this.isLoading = true;
      this.orderSub = this.ordersService.fetchOrder(orderId).subscribe(order => {
        this.order = order;
        this.isLoading = false;
      },
        error => {
          this.alertCtrl
            .create({
              header: 'Greška',
              message: 'Nije moguće prikazati detalje porudžbine.',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  this.navCtrl.navigateBack('/orders');
                }
              }]
            })
            .then(alertEl => alertEl.present());
        });
    })
  }

  ngOnDestroy(): void {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }
}
