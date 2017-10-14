import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Exercise } from '../../model/exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  @Input() private theExercise: Exercise;

  constructor(private location: Location) {
  }

	ngOnInit() {
		// this.route.params
		// 	.switchMap((params: Params) => this.exerciseService.get(params['ex_id']))
    //   .subscribe(vo => {
		// 		this.theExercise = vo;
  	// 	});
  }

	back(){
		this.location.back();
	}

  transform(field, suffix){
		if (!this.theExercise || this.isEmpty(this.theExercise[field]))
			return "";

		var result = "";

		switch (field){
			case "reps":
			case "sets":

				if (!this.isEmpty(this.theExercise[field][0])
						&& !this.isEmpty(this.theExercise[field][1]))
					result = this.theExercise[field][0] + " - " + this.theExercise[field][1];

				else if (!this.isEmpty(this.theExercise[field][0]))
					result = this.theExercise[field][0];

				break;
		}

		if (!suffix) {
			return result;
		} else {
			return result + " " + suffix;
		}
	}

	isEmpty(obj){
		return (!obj);
	}
}
