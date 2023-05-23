import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomDetailPageRoutingModule } from './room-detail-routing.module';

import { RoomDetailPage } from './room-detail.page';

// NgCharts
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomDetailPageRoutingModule,
    NgChartsModule
  ],
  declarations: [RoomDetailPage]
})
export class RoomDetailPageModule {}
