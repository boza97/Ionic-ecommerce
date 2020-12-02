import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../common/product';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.page.html',
  styleUrls: ['./featured.page.scss']
})
export class FeaturedPage implements OnInit {
  loadedProducts: Product[];
  productsSub: Subscription;
  isLoading = false;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private navCtrl: NavController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.isLoading = true;
    this.productsSub = this.productService.featuredProducts.subscribe(products => {
      this.loadedProducts = products;
      this.isLoading = false;
    },
      error => {
        this.showErrorAlert('Nije moguće prikazati proizvode');
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.productService.getFeaturedProducts().subscribe(
      () => { },
      error => {
        this.showErrorAlert('Nije moguće prikazati proizvode');
      });
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product).subscribe(
      () => {
        this.alertCtrl
          .create({
            header: 'Uspešno',
            message: 'Proizvod dodat u korpu',
            buttons: ['Ok']
          })
          .then(alertEl => alertEl.present());
      },
      error => {
        this.showErrorAlert(error.message);
      });
  }

  onDetails(id: number) {
    this.navCtrl.navigateForward('home/tabs/featured/product-detail/' + id);
  }

  private showErrorAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Greška',
        message: message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }

}
