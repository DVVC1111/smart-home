import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { DeviceAddPage } from './device-add/device-add.page';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart/chart.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public line_chart_option: ChartConfiguration['options'] = this.chartService.line_chart_option;
  public line_chart_type: ChartType = this.chartService.line_chart_type;

  public line_chart_data: ChartData<'line'> = this.chartService.line_chart_data;

  // Mock data
  devices = [
    {
      name: 'Ring Video',
      icon: 'videocam',
      place: 'Entrance',
      mode: 'auto'
    },
    {
      name: 'LG Side-by-Side',
      icon: 'restaurant',
      place: 'Kitchen',
      mode: 'auto'
    },
    {
      name: 'PlayStation 5',
      icon: 'game-controller',
      place: 'Living',
      mode: 'manual'
    },
    {
      name: 'Philips Hue',
      icon: 'bulb',
      place: 'Office',
      mode: 'auto'
    },
    {
      name: 'Philips Hue',
      icon: 'bulb',
      place: 'Office',
      mode: 'auto'
    },
    {
      name: 'Philips Hue Bridge',
      icon: 'bulb',
      place: 'Living',
      mode: 'auto'
    }
  ];

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private chartService: ChartService,
    private helperService: HelperService
  ) { }

  ngOnInit() {

    // Create line charts
    this.createLineCharts();

    // Custom options
    this.chartService.line_chart_option.scales['y']['display'] = false;
    this.chartService.line_chart_option.scales['x']['display'] = false;
    this.line_chart_option.plugins.legend.display = false;
  }

  // Open addDevice modal
  async addDevice() {

    const modal = await this.modalController.create({
      component: DeviceAddPage,
      backdropDismiss: false,
      cssClass: '',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {}
    });

    await modal.present();

    // Retreive modal data
    let { data } = await modal.onWillDismiss();
  }

  // Create line charts
  createLineCharts() {

    let helperService = this.helperService;

    this.line_chart_data.labels = ['', '', ''];

    for (let device of this.devices) {

      // Set datasets
      this.line_chart_data.datasets = [
        {
          data: [...Array(7)].map(e => Math.random() * 20 | 0),
          pointRadius: 0,
          tension: 0.5,
          fill: false,
          pointBackgroundColor: helperService.getColorVariable('tertiary'),
          borderColor: helperService.getColorVariable('tertiary'),
          borderWidth: 2
        }
      ];
    }
  }

}
