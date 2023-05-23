import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./../../tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'styleguide',
    loadChildren: () => import('./styleguide/styleguide.module').then(m => m.StyleguidePageModule)
  },
  {
    path: 'rooms',
    loadChildren: () => import('./rooms/rooms.module').then( m => m.RoomsPageModule)
  },
  {
    path: 'rooms/room-detail',
    loadChildren: () => import('./rooms/room-detail/room-detail.module').then( m => m.RoomDetailPageModule)
  },
  {
    path: 'devices/device-detail',
    loadChildren: () => import('./devices/device-detail/device-detail.module').then( m => m.DeviceDetailPageModule)
  },
  {
    path: 'settings/manage-users',
    loadChildren: () => import('./settings/manage-users/manage-users.module').then( m => m.ManageUsersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
