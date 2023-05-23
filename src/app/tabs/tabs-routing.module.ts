import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/secure/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'statistics',
        loadChildren: () => import('../pages/secure/statistics/statistics.module').then(m => m.StatisticsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/secure/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'devices',
        loadChildren: () => import('../pages/secure/devices/devices.module').then(m => m.DevicesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
