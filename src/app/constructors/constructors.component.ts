import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { ConstructorsService } from './constructors.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'constructors',  // <constructors></constructors>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    ConstructorsService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './constructors.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './constructors.component.html'
})
export class ConstructorsComponent {
  localState = { value: '' };
  constructorsData: any;
  seasonYears: any[];
  options: Object;

  constructor ( public appState: AppState,  private _constructorsService: ConstructorsService ) {}

  getStandings (year: number) {
    var that = this;

    this._constructorsService.getStandings(year)
      .subscribe(function(data) {
        that.constructorsData = data;
        that.createChart(that.constructorsData);
      });
  }

  getSeasons () {
    var that = this;

    this._constructorsService.getSeasons()
      .subscribe(function(data) {
        that.seasonYears = data;
        //noinspection TypeScriptUnresolvedVariable
        if (that.seasonYears[0].season) {
          //noinspection TypeScriptUnresolvedVariable
          let latestYear: number = that.seasonYears[0].season;
          that.getStandings(latestYear);
        }
      });
  }

  createChart (data: any) {
    let dataY = [];

    for(let row of data){
      let data = [];
      data.push(row.Constructor.name);
      data.push(Number(row.points));
      dataY.push(data);
    }

    this.options = {
      chart: {
        type: 'column'
      },
      title : { text : 'Constructor Standings Chart' },
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
