import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  title = 'app';
  chart: any = [];
  paisesArray: any = [];
  personas = [];

  constructor() {}

  ngOnInit(): void {
    this.personas = JSON.parse(localStorage.getItem('personas'));

    this.personas.forEach((persona) => {
      for (let i = 0; i < this.paisesArray.length; i++) {
        if (this.paisesArray[i].pais == persona.pais) {
          this.paisesArray[i].cantidad++;
          return;
        }
      }
      this.paisesArray.push({ pais: persona.pais, cantidad: 1 });
    });

    const paisesNombre = [];
    this.paisesArray.forEach((e) => {
      paisesNombre.push(e.pais);
    });
    const paisesCantidad = [];
    this.paisesArray.forEach((e) => {
      paisesCantidad.push(e.cantidad);
    });

    this.chart = new Chart('chart', {
      type: 'bar',
      data: {
        labels: paisesNombre,
        datasets: [
          {
            barThickness: 100,
            data: paisesCantidad,
            backgroundColor: ['#61ADA6', '#F73266', '#F9CDAE', '#FF928F'],
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [{}],
        },
      },
    });
  }
}
