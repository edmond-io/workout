import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { BaseService } from '../../services/base.service';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../model/exercise';

import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-muscle',
  templateUrl: './muscle.component.html',
  styleUrls: ['./muscle.component.scss'],
  providers: []
})
export class MuscleComponent implements OnInit {
	muscle: string;
	exerciseList: Exercise[];
	theExercise: Exercise;

  constructor(private baseService: BaseService,
			private exerciseService: ExerciseService,
			private route: ActivatedRoute,
			private router: Router) {

  }

  ngOnInit() {
		this.route.params
      .subscribe(params => {
				if (params['name'] != this.muscle){
					this.theExercise = null; // clear detail when switch muscle group
					this.muscle = params['name'];
					this.baseService.setSubtitle(this.muscle);

					this.exerciseService.getByName(params['name'])
						.subscribe(voList => {
							this.exerciseList = voList;

							this.route.queryParams
								.subscribe(qparams => {
									if (!qparams['id']){
										this.theExercise = null; // clear detail
										this.baseService.setExercise(null);
										return;
									}
									voList
										.filter(ex => ex.ex_id == +qparams['id'])
										.forEach(ex => {
											this.theExercise = ex;
											this.baseService.setExercise(ex);
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
