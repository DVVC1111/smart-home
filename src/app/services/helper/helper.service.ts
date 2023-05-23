import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  // Get color variable from SCSS by color name
  getColorVariable(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue('--ion-color-' + name);
  }

  // Get color variable RGB from SCSS by color name
  getColorVariableRgb(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue('--ion-color-' + name + '-rgb');
  }

  // Create gradient for chart
  createGradientChart(ctx: any, color_1: string, color_2: string, opacity: number) {

    // Create gradient
    var bar_background = ctx.createLinearGradient(0, 0, 0, 150);
    bar_background.addColorStop(0, this.getColorVariable(color_1));
    bar_background.addColorStop(1, 'rgba(' + this.getColorVariableRgb(color_2) + ', ' + opacity + ')');

    return bar_background;
  }

  // Create doughnut gradient for chart
  createDoughnutGradientChart(ctx: any, color_1: string, color_2: string, opacity: number) {

    var background = ctx.createLinearGradient(0, 0, 0, 450);
    background.addColorStop(0, this.getColorVariable(color_1));
    background.addColorStop(1, 'rgba(' + this.getColorVariableRgb(color_2) + ', ' + opacity + ')');

    return background;
  }
}
