import {Component, AfterViewInit, DoCheck,AfterContentInit, OnChanges, Input} from '@angular/core';
import {OnInit, OnDestroy} from '@angular/core';
import {Case} from './case';
import {CourtsService} from './courts.service';
import {CaseService} from './case.service';
import {Court} from './court';
import { FileUploader } from '../node_modules/ng2-file-upload';
import {SelectModule} from '../node_modules/ng2-select';
import {UpdateCaseService} from './updatecase.service';

@Component({	  
	selector : 'case',
	templateUrl : 'app/addcase.component.html',
	// providers : [CourtsService],
})

export class AddCaseComponent implements OnInit, OnDestroy {  //, DoCheck, 
  
  case : Case;
  court : Court;
  courts : Court[];
  isLoading = true;
  isFileUploaded = true;
  showCourt:boolean;
  // filesToUpload: Array<File>;
  hearing : {
    date: string,
    comment : string
  }
  // public uploader:FileUploader = new FileUploader({url: '/api'});
  constructor(private courtsService: CourtsService, 
              private caseService: CaseService,
              private updateCaseService: UpdateCaseService) {

    this.case = this.updateCaseService.value;
    console.log(this.case);
    this.court = {
      
      title: '',
      shorttext: '', 
      ptitle: "Petitioner",
      dtitle: "Defendant",
    }
    if(this.case.hearings.length == 0) this.addHearing();
    
  }

  addHearing(){
    this.hearing = {
      date : '',
      comment : ''
    }
    this.case.hearings.push(this.hearing);
    
  }
  findCourt (code:string) {
    console.log(this.courts);
    console.log(code);
    let court = this.courts.filter( court => court.shorttext === code);
    if( court.length > 0){
      this.court = court[0];
      console.log(this.court);
    }
  }

  ngOnInit(){
    this.getCourts();
    console.log("onInit");
    // this.jQueryinit();
  }
  onSubmit(){
    while(!this.isFileUploaded);
    console.log("onSubmit");
    // console.log(this.case);
    console.log(this.case._id);
    if(this.case._id){
      console.log("editCAse");
      this.caseService.editCase(this.case).subscribe(xcase => console.log(xcase));
    }else{
       console.log("addCAse");
       this.caseService.addCase(this.case).subscribe(xcase => console.log(xcase)); 
    }
    
    this.clear();
  }
  
  clear(){
    this.case = {
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
  getCourts(){
    // setTimeout(() => {
    console.log("getCourts called!");
  	this.courtsService.getCourts().subscribe(courts => {
      this.courts = courts;
      this.isLoading = false;
    });
     // }, 3000);
  }

  setCourt(value:string){
    this.case.court = value;
    this.findCourt (value);
  }
  setClient(value:string){
    if(value == "1"){
      this.case.client = this.case.petitioner;
    }else if(value=="2"){
      this.case.client = this.case.defendant;
    }
  }


  public fileChangeEvent(fileInput: any){
        this.isFileUploaded = false;
        for(var i=0;i<fileInput.target.files.length;i++){
          this.getBase64(fileInput.target.files[i]);  
        }
        this.isFileUploaded = true;
    
}

  getBase64(file: any) {
    console.log("inside getBase64");
    console.log(file);
   var reader = new FileReader();
   var pdf = {filename:'',base64:''};
   var myReader:FileReader = new FileReader();
  myReader.onloadend = (e) => {
    pdf.filename = file.name;
    pdf.base64 = myReader.result;
    this.case.pdf.push(pdf);
  }
  myReader.readAsDataURL(file);
}

  ngOnDestroy(){
    this.updateCaseService.value = {
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
}