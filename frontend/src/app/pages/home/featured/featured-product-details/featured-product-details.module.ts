import { IonicModule } from '@ionic/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeaturedProductDetailsPageRoutingModule } from './featured-product-details-routing.module';
import { FeaturedProductDetailsPage } from './featured-product-details.page';
import { PipeModule } from '../../../../shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturedProductDetailsPageRoutingModule,
    PipeModule
  ],
  declarations: [FeaturedProductDetailsPage]
})
export class FeaturedProductDetailsPageModule {}
