import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart/chart.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public line_chart_option: ChartConfiguration['options'] = this.chartService.line_chart_option;
  public line_chart_data: ChartData<'line'> = this.chartService.line_chart_data;
  public line_chart_type: ChartType = this.chartService.line_chart_type;

  public doughnut_chart_option: ChartConfiguration['options'] = this.chartService.doughnut_chart_option;
  public doughnut_chart_data: ChartData<'doughnut'> = this.chartService.doughnut_chart_data;
  public doughnut_chart_type: ChartType = this.chartService.doughnut_chart_type;

  public half_doughnut_chart_option: ChartConfiguration['options'] = this.chartService.half_doughnut_chart_option;
  public half_doughnut_chart_data: ChartData<'doughnut'> = this.chartService.half_doughnut_chart_data;
  public half_doughnut_chart_type: ChartType = this.chartService.half_doughnut_chart_type;

  timescale: string = 'day';

  constructor(
    private chartService: ChartService,
    private helperService: HelperService
  ) { }

  ngOnInit() {

    // Create line chart
    this.createLineChart(this.timescale);

    // Create doughnut chart
    this.createDoughnutChart();

    // Create half doughnut chart
    this.createHalfDoughnutChart();

    // Custom options
    this.chartService.line_chart_option.scales['y']['display'] = true;
    this.chartService.line_chart_option.scales['x']['display'] = true;
    this.chartService.line_chart_option.scales.y.ticks = {
      color: this.helperService.getColorVariable('medium'),
      font: {
        family: 'IBM Plex Sans',
        weight: '500'
      },
      callback: function (value, index, ticks) {
        return '$' + value;
      },
      maxTicksLimit: 5
    };
    this.line_chart_option.plugins.legend = {
      display: false
    };
  }

  // Change timescale
  changeTimescale(event: any) {
    this.timescale = event.detail.value;
    this.createLineChart(this.timescale);
    this.chart.update();
  }

  // Create line chart
  createLineChart(timescale: string) {

    let helperService = this.helperService;

    let val_max_1 = 0;
    let val_max_2 = 0;

    switch (timescale) {
      case 'day':
        val_max_1 = 2;
        val_max_2 = 6;
        break;
      case 'week':
        val_max_1 = 7;
        val_max_2 = 20;
        break;
      case 'month':
        val_max_1 = 30;
        val_max_2 = 80;
        break;
      case 'year':
        val_max_1 = 400;
        val_max_2 = 1000;
        break;
    }

    // Random array of numbers
    let rand_numbers_1 = [...Array(7)].map(e => Math.random() * val_max_1 | 0);
    let rand_numbers_2 = [...Array(7)].map(e => Math.random() * val_max_2 | 0);

    // Set labels
    this.line_chart_data.labels = Array.from(Array(7).keys());

    // Set datasets
    this.line_chart_data.datasets = [
      {
        data: rand_numbers_1,
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
          return helperService.createGradientChart(ctx, 'secondary', 'secondary', .5);
        },
        pointBackgroundColor: helperService.getColorVariable('secondary'),
        borderColor: helperService.getColorVariable('secondary'),
        borderWidth: 2
      },
      {
        data: rand_numbers_2,
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
          return helperService.createGradientChart(ctx, 'tertiary', 'tertiary', .5);
        },
        pointBackgroundColor: helperService.getColorVariable('tertiary'),
        borderColor: helperService.getColorVariable('tertiary'),
        borderWidth: 2
      }
    ];
  }

  // Create doughnut chart
  createDoughnutChart() {

    let helperService = this.helperService;

    this.doughnut_chart_data.labels = ['Water', 'Electricity'];

    // Set datasets
    this.doughnut_chart_data.datasets = [
      {
        label: 'Dataset 1',
        data: [...Array(2)].map(e => Math.random() * 50 | 0),
        backgroundColor: [
          'rgba(' + helperService.getColorVariableRgb('tertiary') + ', ' + 0.85 + ')',
          'rgba(' + helperService.getColorVariableRgb('secondary') + ', ' + 0.85 + ')'],
        borderColor: [
          'rgba(' + helperService.getColorVariableRgb('tertiary') + ', ' + 1 + ')',
          'rgba(' + helperService.getColorVariableRgb('secondary') + ', ' + 1 + ')'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(' + helperService.getColorVariableRgb('tertiary') + ', ' + 0.85 + ')',
          'rgba(' + helperService.getColorVariableRgb('secondary') + ', ' + 0.85 + ')'
        ],
        hoverBorderColor: [
          'rgba(' + helperService.getColorVariableRgb('tertiary') + ', ' + 1 + ')',
          'rgba(' + helperService.getColorVariableRgb('secondary') + ', ' + 1 + ')'
        ]
      },
    ];
  }

  // Create half doughnut chart
  createHalfDoughnutChart() {

    let helperService = this.helperService;

    this.half_doughnut_chart_data.labels = [];

    let data = [71, 29];

    // Set datasets
    this.half_doughnut_chart_data.datasets = [
      {
        label: 'Dataset 1',
        data: data,
        backgroundColor: [
          'rgba(' + helperService.getColorVariableRgb('tertiary') + ', ' + 1 + ')',
          'rgba(' + helperService.getColorVariableRgb('medium') + ', ' + .2 + ')'],
        borderWidth: 0,
        hoverBackgroundColor: [
          'rgba(' + helperService.getColorVariableRgb('tertiary') + ', ' + 1 + ')',
          'rgba(' + helperService.getColorVariableRgb('medium') + ', ' + .2 + ')'
        ],
        rotation: -110,
        circumference: 220
      }
    ];
  }

}
