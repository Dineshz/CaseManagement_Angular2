import { NgModule }      		        from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import {APP_BASE_HREF}              from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { CommonModule }             from '@angular/common';
import { HttpModule }               from '@angular/http';
import { AppComponent }  		        from './app.component';
import { NavBarComponent } 		      from './navbar.component';
import { SearchComponent } 		      from './search.component';
// import { ManageCaseComponent } 		  from './managecase.component';
import { CourtsComponent } 		      from './courts.component';
import { AddCaseComponent }           from './addcase.component';
import { PageNotFoundComponent } 		from './pagenotfound.component';


const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  // { path: 'case/:id',      component: HeroDetailComponent },
  { path: 'managecases', component: AddCaseComponent },
  {
    path: 'courts',
    component: CourtsComponent,
    // data: { title: 'Heroes List' }
  },
  {
    path: 'test',
    component: AppComponent,
    // data: { title: 'Heroes List' }
  },
  { path: '*other',
    redirectTo: '/',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/',}
   // component: PageNotFoundComponent }
  
];

@NgModule({
  imports:      [ 
  		RouterModule.forRoot(appRoutes),
      CommonModule,
      HttpModule,
      FormsModule
   ],
   exports:[
   		RouterModule,
       HttpModule
   ],
   declarations:[
         SearchComponent,
         CourtsComponent,
         AddCaseComponent,
         PageNotFoundComponent
         ],
   providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})

export class AppRoutingModule { 

}
