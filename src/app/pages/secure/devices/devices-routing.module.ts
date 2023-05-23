import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevicesPage } from './devices.page';

const routes: Routes = [
  {
    path: '',
    component: DevicesPage
  },
  {
    path: 'device-add',
    loadChildren: () => import('./device-add/device-add.module').then( m => m.DeviceAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevicesPageRoutingModule {}
