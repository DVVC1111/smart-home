import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart/chart.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
})
export class RoomDetailPage implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public bar_chart_option: ChartConfiguration['options'] = this.chartService.bar_chart_option;
  public bar_chart_data: ChartData<'bar'> = this.chartService.bar_chart_data;
  public bar_chart_type: ChartType = this.chartService.bar_chart_type;

  // Sample data
  devices: any = [
    { id: 1, name: 'Main Light', status: 'connected', usage: 1.5, active: true, reloading: false },
    { id: 2, name: 'Reading Light', status: 'connected', usage: 0.65, active: false, reloading: false },
    { id: 3, name: 'Apple TV', status: 'connected', usage: 2.5, active: false, reloading: false },
    { id: 4, name: 'Air Conditioner', status: 'disconnected', usage: 0, active: false, reloading: false }
  ];

  constructor(
    private helperService: HelperService,
    private chartService: ChartService
  ) { }

  ngOnInit() {

    // Create bar chart
    this.createBarChart();
  }

  // Toggle device
  toggleDevice(id: number) {
    let device = this.devices.filter(device => device?.id === id)[0];
    device.active = !device.active;
  }

  // Create bar chart
  createBarChart() {

    let helperService = this.helperService;

    // Random array of numbers
    let rand_numbers = [...Array(12)].map(e => Math.random() * 30 | 5);

    // Set labels
    this.bar_chart_data.labels = Array.from(Array(12).keys())

    // Set datasets
    this.bar_chart_data.datasets = [
      {
        data: rand_numbers,
        backgroundColor: function (context) {

          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }

          // Create gradient
          return helperService.createGradientChart(ctx, 'secondary', 'secondary', .25);
        },
        barThickness: 10,
        borderRadius: 4,
        borderColor: helperService.getColorVariable('secondary'),
        hoverBackgroundColor: helperService.getColorVariable('secondary'),
        pointStyle: 'circle',
      }
    ];
  }

}
