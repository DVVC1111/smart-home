import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceAddPage } from './device-add.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceAddPageRoutingModule {}
