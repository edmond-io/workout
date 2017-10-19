import { Component, OnInit, Input, Output } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { MuscleService } from '../../services/muscle.service';
import { Exercise } from '../../model/exercise';
import { Muscle } from '../../model/muscle';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
	title: string;
	subtitle: string = "Workout";
	selectedMuscle: string;

	exercise: Exercise;
	muscleList: Muscle[] = [];
	muscleExt: Muscle[] = [];
	selectOptions = [];

  constructor(private baseService: BaseService,
			private muscleService: MuscleService,
			private location: Location,
			private router: Router) {
  }

	init(){

		let m: Muscle = new Muscle();
		m.cname = "Day 1 背+三頭肌";
		m.name = "day1";
		this.muscleExt.push(m);

		m = new Muscle();
		m.cname = "Day 2 大腿+小腿";
		m.name = "day2";
		this.muscleExt.push(m);

		m = new Muscle();
		m.cname = "Day 3 胸+二頭肌";
		m.name = "day3";
		this.muscleExt.push(m);

		// this.muscleExt.forEach(m => {
		// 	this.muscleList.push(m);
		// })
		this.muscleList = this.muscleExt;
	}
	ngOnInit(){
		this.init();
		this.getMuscleList();

		// subscribe
		this.baseService.title$.subscribe(p => {this.title = p;});
		this.baseService.subtitle$.subscribe(p => {this.selectedMuscle = p;});
		this.baseService.ex$.subscribe(p => {this.exercise = p;});
	}

	getMuscleList(){
		this.muscleService.getAll()
			.subscribe(voList => {
				this.muscleList = voList;


				//window.setTimeout(function(){
					this.muscleExt.forEach(m => {
						this.muscleList.push(m);
					})
				//}, 100);
			})
	}

	back(){
		this.location.back();
	}

	route(){
		let link = (this.selectedMuscle)
			? '/muscle/'+this.selectedMuscle
			: '/';

		this.router.navigate([link]);
	}
}
