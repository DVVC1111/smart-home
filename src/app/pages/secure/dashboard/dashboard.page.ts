import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart/chart.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild('swiper') swiper: SwiperComponent;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public line_chart_option: ChartConfiguration['options'] = this.chartService.line_chart_option;
  public line_chart_data: ChartData<'line'> = this.chartService.line_chart_data;
  public line_chart_type: ChartType = this.chartService.line_chart_type;

  slides_default_config: SwiperOptions = {
    slidesPerView: 2.4,
    spaceBetween: 16
  }

  constructor(
    private actionSheetController: ActionSheetController,
    private chartService: ChartService,
    private helperService: HelperService
  ) { }

  ngOnInit() {

    // Create line chart
    this.createLineChart();

    // Custom options
    this.line_chart_option.plugins.legend.display = true;
    this.line_chart_option.scales.x['stacked'] = true;
    this.line_chart_option.scales.y['stacked'] = false;
    this.line_chart_option.plugins.legend = {
      position: 'bottom',
      display: true,
      align: 'center',
      labels: {
        padding: 8,
        boxWidth: 8,
        boxHeight: 12,
        font: {
          family: 'IBM Plex Sans'
        },
        usePointStyle: true,
        pointStyle: 'circle'
      }
    }
  }

  // Action sheet
  async add() {

    const actionSheet = await this.actionSheetController.create({
      header: 'What would you like to add?',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Add device',
          icon: 'layers',
          handler: () => {
            // Put in logic ...
          }
        },
        {
          text: 'Add room',
          icon: 'square',
          handler: () => {
            // Put in logic ...
          }
        },
        {
          text: 'Add person',
          icon: 'person-add',
          handler: () => {
            // Put in logic ...
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }

  // Create line chart
  createLineChart() {

    let helperService = this.helperService;

    // Random array of numbers
    let rand_numbers = [...Array(7)].map(e => Math.random() * 80 | 0);

    // Set labels
    this.line_chart_data.labels = ['', '', '', '', '', '', ''];

    // Set datasets
    this.line_chart_data.datasets = [
      {
        label: 'Usage in kWh',
        data: rand_numbers,
        pointRadius: 0,
        tension: 0.5,
        fill: true,
        backgroundColor: function (context) {

          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }

          // Create gradient
          return helperService.createGradientChart(ctx, 'secondary', 'secondary', .05);
        },
        pointBackgroundColor: helperService.getColorVariable('secondary'),
        borderColor: helperService.getColorVariable('secondary'),
        borderWidth: 2
      },
      {
        label: 'Load peak',
        type: 'line',
        data: [40, 40, 40, 40, 40, 40, 40],
        backgroundColor: helperService.getColorVariable('primary'),
        borderColor: helperService.getColorVariable('primary'),
        pointBackgroundColor: helperService.getColorVariable('primary'),
        borderDash: [10, 5],
        borderWidth: 2,
        pointRadius: 0
      }
    ];
  }

}
