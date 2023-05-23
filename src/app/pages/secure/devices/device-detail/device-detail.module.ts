import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceDetailPageRoutingModule } from './device-detail-routing.module';

import { DeviceDetailPage } from './device-detail.page';

// NgCharts
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceDetailPageRoutingModule,
    NgChartsModule
  ],
  declarations: [DeviceDetailPage]
})
export class DeviceDetailPageModule {}
