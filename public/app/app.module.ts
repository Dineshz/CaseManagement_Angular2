import { NgModule }      		from '@angular/core';
import { BrowserModule } 		from '@angular/platform-browser';
import { AppRoutingModule }     from './app-routing.module';
import { HttpModule } 			from '@angular/http';
import { FormsModule }			from '@angular/forms';
import { AppComponent }  		from './app.component';
import { NavBarComponent } 		from './navbar.component';
import {CourtsService} from './courts.service';
import {CaseService} from './case.service';
import {UpdateCaseService} from './updatecase.service';
@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, HttpModule, FormsModule],
  declarations: [ AppComponent, NavBarComponent],
  bootstrap:    [ AppComponent],
  providers :   [ CourtsService, CaseService, UpdateCaseService ]
})

export class AppModule { 

}
