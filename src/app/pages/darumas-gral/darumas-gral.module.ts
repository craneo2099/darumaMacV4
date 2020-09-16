import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DarumasGralPageRoutingModule } from './darumas-gral-routing.module';

import { DarumasGralPage } from './darumas-gral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DarumasGralPageRoutingModule
  ],
  declarations: [DarumasGralPage]
})
export class DarumasGralPageModule {}
