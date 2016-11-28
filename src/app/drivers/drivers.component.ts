import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { DriversService } from './drivers.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'drivers',  // <drivers></drivers>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    DriversService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './drivers.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './drivers.component.html'
})
export class DriversComponent {
  localState = { value: '' };
  driversData: any;
  seasonYears: any[];
  options: Object;

  constructor (public appState: AppState, private _driversService: DriversService ) { }

  getStandings (year: number) {
    var that = this;

    this._driversService.getStandings(year)
      .subscribe(function(data) {
        that.driversData = data;
        that.createChart(that.driversData);
      });
  }

  getSeasons () {
    var that = this;

    this._driversService.getSeasons()
      .subscribe(function(data) {
        that.seasonYears = data;
        //noinspection TypeScriptUnresolvedVariable
        if (that.seasonYears[0].season) {
          //noinspection TypeScriptUnresolvedVariable
          let latestYear = that.seasonYears[0].season;
          that.getStandings(latestYear);
        }
      });
  }

  createChart (data: any) {
    let dataY = [];

    for(let row of data){
      let data = [];
      data.push(row.Driver.code);
      data.push(Number(row.points));
      dataY.push(data);
    }

    this.options = {
      chart: {
        type: 'column'
      },
      title : { text : 'Driver Standings Chart' },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Points'
        }
      },
      legend: {
        enabled: false
      },
      series: [{
        data:
        dataY
      }]
    };
  }

  onChangeYear(year: number) {
    this.getStandings(year);
  }

  ngOnInit() {
    this.getSeasons();
  }

  submitState(value: string) {

  }
}
