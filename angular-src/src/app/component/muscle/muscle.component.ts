import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Location }  from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../model/exercise';

import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-muscle',
  templateUrl: './muscle.component.html',
  styleUrls: ['./muscle.component.css'],
  providers: []
})
export class MuscleComponent implements OnInit {
	muscle: string;
	exerciseList: Exercise[];
	theExercise: Exercise;

  constructor(private exerciseService: ExerciseService,
			private route: ActivatedRoute,
			private router: Router) {
		console.log("init again");
	  //this.exerciseList = [];
  }

  ngOnInit() {
		this.route.params
      .subscribe(params => {
				if (params['name'] != this.muscle){
					this.theExercise = null; // clear detail when switch muscle group
					this.muscle = params['name'];

					this.exerciseService.getByName(params['name'])
						.subscribe(voList => {
							this.exerciseList = voList;

							this.route.queryParams
								.subscribe(qparams => {
									console.log(qparams, !qparams);
									if (!qparams['id']){
										this.theExercise = null; // clear detail
										return;
									}
									voList
										.filter(ex => ex.ex_id == +qparams['id'])
										.forEach(ex => {
											this.theExercise = ex;
										})
								})
							// get the detail page if ex_id is provided in the url

						})
				}
  		});
  }

  showDetail(ex){
		this.theExercise = ex;
		this.router.navigate(['/muscle/'+this.muscle], {
			queryParams: {
				"id": ex.ex_id
			}});
  }
}
