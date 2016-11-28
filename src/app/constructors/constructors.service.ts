import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ConstructorsService {
  constructor ( private http: Http ) {}

  getStandings(year: number){
    return this.http.get(`http://ergast.com/api/f1/${year}/constructorStandings.json`)
      .map(res => res.json().MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
      .catch(this.handleError);
  }

  getSeasons() {
    return this.http.get(`http://ergast.com/api/f1/seasons.json?limit=200`)
      .map(res => res.json().MRData.SeasonTable.Seasons.reverse())
      .catch(this.handleError);
  }

  private handleError ( error: Response ) {
    console.log("Error on request data " + error);
    return Observable.throw(error || "Server error");
  }
}
