import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeaturedPageRoutingModule } from './featured-routing.module';

import { FeaturedPage } from './featured.page';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturedPageRoutingModule,
    PipeModule
  ],
  declarations: [FeaturedPage]
})
export class FeaturedPageModule {}
