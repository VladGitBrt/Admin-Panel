import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as echarts from 'echarts';
import { Subject, takeUntil } from 'rxjs';
import { IDashboardGraph } from 'src/app/models/models';
import { AppSelectors } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardData: IDashboardGraph;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store$: Store) { 
    this.store$.select(AppSelectors.state)
    .pipe(takeUntil(this.destroy$))
    .subscribe( store => {
        this.dashboardData = store.dashboardData;
      }
    );
   }

  ngOnInit(): void {
  let chartDom = document.getElementById('graph')!;
  let myChart = echarts.init(chartDom);
  const option = {
      color: [
        "#00B4D8",
        "#EDF0F2"
      ],
      stackBorderRadius: [10,10,0,0],
      legend: {show: false},
      grid: {
        width: '93%',
        right: '2%'
      },
    tooltip: {},
      dataset: {
        dimensions: ['web', 'desktop', 'mobile'],
        source: [
          { web: '1 Aug', 'desktop': 17000, 'mobile': 11000 },
          { web: '2 Aug', 'desktop': 3000, 'mobile': 19500 },
          { web: '3 Aug', 'desktop': 18000, 'mobile': 6000 },
          { web: '4 Aug', 'desktop': 23000, 'mobile': 28000 },
          { web: '5 Aug', 'desktop': 27000, 'mobile': 28000 },
          { web: '6 Aug', 'desktop': 17000, 'mobile': 23000 },
          { web: '6 Аug', 'desktop': 0, 'mobile': 0 }
        ]
      },
    xAxis: { type: 'category',axisLine: {show: false}, axisTick: {show: false} },
      yAxis: [{
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed"
          }
        }
      }],
      series: [
        {type: 'bar', 
          barWidth: 10, 
          itemStyle: {
            emphasis: {barBorderRadius: [50,50]}, 
            normal: {barBorderRadius: [50,50,0,0]}
          }
        },
        {   type: 'bar',
          barWidth: 10,
          itemStyle: {
            emphasis: {barBorderRadius: [15,15]}, 
            normal: {barBorderRadius: [15,15,0,0]}
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
