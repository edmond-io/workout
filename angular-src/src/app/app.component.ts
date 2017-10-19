import { Component } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import { BaseService } from './services/base.service';
import { MuscleService } from './services/muscle.service';
import { ExerciseService } from './services/exercise.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
		BaseService,
  	MuscleService,
  	ExerciseService
  ]
})
export class AppComponent {

}
