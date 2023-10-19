import { Component, Input, OnInit } from '@angular/core';
import { Point } from '../../models/point';


@Component({
  selector: 'app-stress-chart',
  templateUrl: './stress-chart.component.html',
  styleUrls: ['./stress-chart.component.scss']
})
export class StressChartComponent implements OnInit {

  private _designValues: Point[] = [];
  public get designValues(): Point[] {
    return this._designValues;
  }
  @Input()
  public set designValues(value: Point[]) {
    this._designValues = value;
    this.updateChart();
  }

  private _characteristicValues: Point[] = [];
  public get characteristicValues(): Point[] {
    return this._characteristicValues;
  }
  @Input()
  public set characteristicValues(value: Point[]) {
    this._characteristicValues = value;
    this.updateChart();
  }

  data: unknown;
  options: unknown;

  ngOnInit() {
    this.updateChart();
  }

  private updateChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.characteristicValues.map(e => e.x),
      datasets: [
        {
          label: 'Design Stress',
          data: this.designValues,
          fill: true,
          borderColor: documentStyle.getPropertyValue('--cyan-700'),
          tension: 0.4
        },
        {
          label: 'Characteristic Stress',
          data: this.characteristicValues,
          fill: true,
          borderColor: documentStyle.getPropertyValue('--bluegray-500'),
          tension: 0.4
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        },
        tooltip: {
          enabled: false
        }
      },
      elements: {
        point: {
          radius: 0,
          hoverRadius: 0
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Strain [%]'
          },
          ticks: {
            color: textColorSecondary,
            align: 'inner',
            autoSkipPadding: 10,
            //maxTicksLimit: 10,
            minRotation: 50,
            labelOffset:-10,
            crossAlign: 'center',
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          title: {
            display: true,
            text: 'Stress [N/mm2]'
          },
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}
