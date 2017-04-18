import { Injectable } from '@angular/core';
import { Court } from './court'; 
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export const HEROES: Court[] = [
 {_id:'', title:'x', shorttext:'x', ptitle:'x', dtitle:'x'},
 {_id:'', title:'x', shorttext:'x', ptitle:'x', dtitle:'x'},
 {_id:'', title:'x', shorttext:'x', ptitle:'x', dtitle:'x'},
];

@Injectable()
export class CourtsService {
	private _url = '/xcourts';
	
	constructor(private _http: Http){
	}

  getCourts()  : Observable<Court[]> {
  	return this._http.get(this._url).map(res => res.json());
  }

  addCourt(court : Court) : Observable<Court[]>{
  	return this._http.post(this._url,court).map(res => res.json());
  }

  editCourt(court : Court) : Observable<Court[]>{
  	return this._http.put(this._url,court).map(res => res.json());
  }

  delCourt(court : Court)  : Observable<Court[]> {
  	return this._http.delete(this._url +'?id=' + court._id).map(res => res.json());
  }
}