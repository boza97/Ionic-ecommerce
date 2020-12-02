import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/common/category';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit, OnDestroy {
  loadedCategories: Category[];
  categoriesSub: Subscription;
  isLoading = false;

  constructor(
    private categoryService: CategoryService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.isLoading = true;
    this.categoriesSub = this.categoryService.categories.subscribe(categories => {
      this.loadedCategories = categories;
      this.isLoading = false;
    },
      error => {
        this.showErrorAlert('Nije moguće prikazati kategorije.');
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe(
      () => { },
      error => {
        this.showErrorAlert('Nije moguće prikazati kategorije.');
      });
  }

  ngOnDestroy(): void {
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
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
