import {Component} from '@angular/core';
import {CaseService} from './case.service';
import {Case} from './case';
import {DomSanitizer} from '@angular/platform-browser';
import {AddCaseComponent} from './addcase.component';
import {UpdateCaseService} from './updatecase.service';
import { Router }     from '@angular/router';

@Component({	
	selector : 'search',
	templateUrl : 'app/search.component.html'
})

export class SearchComponent { 
	searchstr : string;
	isLoading : boolean;
	dispdetail : boolean;
	viewatt:boolean;
	selcase : Case;
	cases: Case[];
	constructor(private caseService: CaseService,
				private updateCaseService: UpdateCaseService,
				private sanitizer: DomSanitizer,
				private router:Router){
		this.searchstr = '';
		this.dispdetail = false;
		this.isLoading = false;
		this.viewatt = false;
		this.selcase = {
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
			hearings : [{date:'',comment:''}],
			judgement : '',
			pdf : []
		};
	}

	onSubmit(){
		console.log("onSubmit executed");
		this.isLoading = true;

		this.caseService.getCase(this.searchstr).subscribe(cases => {
			this.isLoading = false;
			this.cases = cases;
			console.log(this.cases);
		});
	}

	onSelect(selcase:Case){
		this.dispdetail = true;
		this.selcase = selcase;
	}

	goBack(){
		this.dispdetail = false;
		this.viewatt = false;
	}

	viewAtt(lcase:Case){
		this.isLoading = true;
		this.caseService.getAttachment(lcase).subscribe(acase => {
			this.isLoading = false;
			this.selcase = acase;
			// var uritype = 'data:application/octet-stream;charset=utf-16le;base64,';
			// uritype = 'data:text/plain;charset=utf-8,';
			for(var i = 0;i< this.selcase.pdf.length;i++){
			// 	this.selcase.pdf[i].base64 = uritype + this.selcase.pdf[i].base64.split(',')[1];
				if(this.selcase.pdf[i].base64)
				this.selcase.pdf[i]["blobUrl"] = this.sanitizer.bypassSecurityTrustUrl(this.getBlobUrl(this.selcase.pdf[i].base64.split(',')[1], 'text/plain',512));
				//this.sanitizer.bypassSecurityTrustUrl(
			}
			this.viewatt = true;
			console.log(this.selcase.pdf);
		});
	}
	updateCase(lcase:Case){
		this.updateCaseService.value = lcase;
		this.router.navigate(['/managecases']);
	}

getBlobUrl(b64Data:string, contentType:string, sliceSize:number):string{
		
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
var blobUrl = URL.createObjectURL(blob);
return blobUrl;
}

}