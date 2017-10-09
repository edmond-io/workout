import { Component } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import { ApiService } from './services/api.service';
import { CategoryService } from './services/category.service';
import { MuscleService } from './services/muscle.service';
import { ExerciseService } from './services/exercise.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
	  ApiService,
  	CategoryService,
  	MuscleService,
  	ExerciseService
  ]
})
export class AppComponent {
  title = 'Workout';
}
