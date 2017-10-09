import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Location }  from '@angular/common';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../model/exercise';

import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-muscle',
  templateUrl: './muscle.component.html',
  styleUrls: ['./muscle.component.css'],
  providers: [ExerciseService]
})
export class MuscleComponent implements OnInit {
	muscle: string;
	exerciseList: Exercise[];
	theExercise: Exercise;
	
  constructor(private exerciseService: ExerciseService,
		  private route: ActivatedRoute,
  		private location: Location) {
	  this.exerciseList = [];
	  this.route.params.subscribe(params => {
		  this.muscle = params['name'];
	  })
  }

  ngOnInit() {
	  this.route.params
      .switchMap((params: Params) => this.exerciseService.getByName(params['name']))
      .subscribe(voList =>{
	      // clear detail
	      if((voList.length > 0 && voList[0].muscle_name != this.muscle)
	      		|| voList.length == 0)
	      	this.theExercise = null;
	      	
				this.exerciseList = voList;
  		});		
  }
  
  showDetail(ex){
	  this.theExercise = ex;
  }
	
	reload(){
		if (this.muscle){
			this.exerciseService.getByName(this.muscle)
	      .subscribe(voList =>{
					this.exerciseList = voList;
	  		});		
		}
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
