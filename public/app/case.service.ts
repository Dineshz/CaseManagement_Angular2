import { Injectable } from '@angular/core';
// import { Court } from './court'; 
import { Case } from './case';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CaseService { 
	private _url = '/xcases';
	
	constructor(private _http: Http) {
	}

  // getCourts()  : Observable<Court[]> {
  // 	return this._http.get(this._url).map(res => res.json());
  // }

  addCase(xcase : Case): Observable<Case[]> { 
  	return this._http.post(this._url,xcase).map(res => res.json());
  }

  getCase(str : string)  : Observable<Case[]> {
    console.log("inside get case");
    return this._http.get(this._url +'?regex=' + str).map(res => res.json());
  }

  getAttachment(xcase: Case): Observable<Case>{
    return this._http.get(this._url +'?id=' + xcase._id).map(res => res.json());
  }

  // editCourt(court : Court) : Observable<Court[]>{
  // 	return this._http.put(this._url,court).map(res => res.json());
  // }

  // delCourt(court : Court)  : Observable<Court[]> {
  // 	return this._http.delete(this._url +'?id=' + court._id).map(res => res.json());
  // }
}