import { BrowserModule } from '@angular/platform-browser';
import { MaterializeModule } from 'angular2-materialize';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OrderByPipe } from './pipe/order-by.pipe';

import { AppComponent } from './app.component';
import { HelperComponent } from './component/helper/helper.component';
import { MuscleComponent } from './component/muscle/muscle.component';
import { ExerciseComponent } from './component/exercise/exercise.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import { ApiService } from "./services/api.service";

// Define routes
const ROUTES = [
  {
    path: 'dashboard',
		component: DashboardComponent,
		name: 'Dashboard'
  },
  {
    name: 'Muscle',
    path: 'muscle/:name',
    component: MuscleComponent
  },
  {
	  name: 'Helper',
    path: 'helper',
    component: HelperComponent
  },
  {
    path: '',
		component: DashboardComponent,
    pathMatch: 'full'
  }

]

@NgModule({
  declarations: [
  	OrderByPipe,
    AppComponent,
    HelperComponent,
    MuscleComponent,
    ExerciseComponent,
    DashboardComponent,
    AppHeaderComponent
  ],
  imports: [
  	BrowserModule,
  	FormsModule,
  	HttpModule,
  	MaterializeModule,
  	RouterModule.forRoot(ROUTES, { enableTracing: false })
  ],
  providers: [
    ApiService,
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [ ApiService ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export function init(apiService: ApiService){
  // Do initing of services that is required before app loads
  return () => apiService.load();
}
export class AppModule { }
