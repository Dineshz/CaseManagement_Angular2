import {Component, AfterViewInit, DoCheck,AfterContentInit, OnChanges, Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {Case} from './case';
import {CourtsService} from './courts.service';
import {CaseService} from './case.service';
import {Court} from './court';
import { FileUploader } from '../node_modules/ng2-file-upload';
import {SelectModule} from '../node_modules/ng2-select';


@Component({	  
	selector : 'case',
	templateUrl : 'app/addcase.component.html',
	// providers : [CourtsService],
})

export class AddCaseComponent implements OnInit {  //, DoCheck, 
  
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
  constructor(private courtsService: CourtsService, private caseService: CaseService) {

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
    this.court = {
      
      title: '',
      shorttext: '', 
      ptitle: "Petitioner",
      dtitle: "Defendant",
    }
    
    this.addHearing();
    
    // this.filesToUpload = [];
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
    this.caseService.addCase(this.case).subscribe(xcase => console.log(xcase));
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
      this.isLoading = false;
      this.courts = courts;
      console.log(courts);
      
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

  // fileChangeEvent(fileInput: any){
  //       this.filesToUpload = <Array<File>> fileInput.target.files;
  //   }

  //   makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
  //       return new Promise((resolve, reject) => {
  //           var formData: any = new FormData();
  //           var xhr = new XMLHttpRequest();
  //           formData.append("cpdf", files[0], files[0].name);
  //           console.log(formData["cpdf"]);
  //           // for(var i = 0; i < files.length; i++) {
  //           //     formData.append("uploads[]", files[i], files[i].name);
  //           //     console.log("Inside loop");
  //           //     console.log(formData);
  //           // }
  //           xhr.onreadystatechange = function () {
  //               if (xhr.readyState == 4) {
  //                   if (xhr.status == 200) {
  //                       resolve(JSON.parse(xhr.response));
  //                   } else {
  //                       reject(xhr.response);
  //                   }
  //               }
  //           }
  //           xhr.open("POST", url, true);
  //           xhr.setRequestHeader("enctype", "multipart/form-data");
  //           xhr.setRequestHeader("Cache-Control", "no-cache");
  //           xhr.setRequestHeader("Cache-Control", "no-store");
  //           xhr.setRequestHeader("Pragma", "no-cache");
  //           xhr.send(formData);
  //       });
  //   }

//   upload() {
//         this.makeFileRequest("/upload", [], this.filesToUpload).then((result) => {
//           console.log("Result : ");
//             console.log(result);
//         }, (error) => {
//           console.log("ERROR : ");
//             console.error(error);
//         });
//     }
}