import { Injectable } from '@angular/core';
// import { Court } from './court'; 
import { Case } from './case';
// import { Http } from '@angular/http';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

@Injectable()
export class UpdateCaseService { 
	private _case : Case;
	
	constructor() {
    this._case = {
      court : '',
      type : '',
      id : '',
      dairy_no : '',
      year : new Date().getFullYear(),
      petitioner : '',
      defendant : '',
      client : '',
      defadvocate : '',
      petadvocate : '',
      subject : '',
      status : '',
      judge : '',
      lastupdated : '',
      hearings : [],
      judgement : '',
      pdf : []
    };
	}

  public set value(xcase : Case) {
    this._case = xcase;
  }

  public get value() : Case {
    return this._case;
  }
}