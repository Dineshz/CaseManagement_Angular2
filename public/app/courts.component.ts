import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {CourtsService} from './courts.service'
import {Court} from './court';
@Component({	
	selector : 'courts',
	templateUrl : 'app/courts.component.html',
	// providers : [CourtsService],
})

export class CourtsComponent implements OnInit {
	court : Court;
	courts : Court[];
	isLoading = true;
	constructor(private courtsService: CourtsService) {
		this.court = {
			title:'',
			shorttext:'',
			ptitle:'',
			dtitle:'',
		}
  }
  ngOnInit(){
    
  	this.getCourts();
    
  }
  onSubmit(){
    if(!(this.court.title && this.court.shorttext)) return;
    console.log(!(this.court.title && this.court.shorttext));
  	if(!this.court._id){
  		this.courtsService.addCourt(this.court).subscribe(court => console.log(court));
  	}else{
  		this.courtsService.editCourt(this.court).subscribe(court => console.log(court));
  	}

  	this.court = {
  		title:'',
  		shorttext:'',
  		ptitle:'',
  		dtitle:''
  	};
  	this.getCourts();

  }
  onEdit(court : Court){
  	this.court = court;
  }
  onDelete(court: Court){
    console.log(court);
    this.courtsService.delCourt(court).subscribe(court => console.log(court));
    this.getCourts();
  }

  getCourts(){
  	this.courtsService.getCourts().subscribe(courts => {
  		this.isLoading = false;
  		this.courts = courts;
      console.log("executed");
  	});
  }
  clearData(){
    
    this.court = {
      _v:0,
      _id:'',
      title:'',
      shorttext:'',
      ptitle:'',
      dtitle:''
    };
    delete this.court._v;
    delete this.court._id;
  console.log(this.court);
  }
}