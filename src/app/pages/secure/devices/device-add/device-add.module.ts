import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceAddPageRoutingModule } from './device-add-routing.module';

import { DeviceAddPage } from './device-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceAddPageRoutingModule
  ],
  declarations: [DeviceAddPage]
})
export class DeviceAddPageModule {}
