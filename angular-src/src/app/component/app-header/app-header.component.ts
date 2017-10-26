import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { MuscleService } from '../../services/muscle.service';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../model/exercise';
import { Muscle } from '../../model/muscle';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MaterializeAction, toast} from "angular2-materialize";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
	title: string;
	subtitle: string = "Workout";
	selectedMuscle: string;

	exercise: Exercise = new Exercise();
	muscleList: Muscle[] = [];
	muscleExt: Muscle[] = [];
	selectOptions = [];

	updateModalAction = new EventEmitter<string|MaterializeAction>();
	updateModalParams = [{ dismissible: true}];
	name: string;
	cname: string;

	muscleChipsAction = new EventEmitter<string|MaterializeAction>();
	muscleChipsParams = {
		placeholder: '+Muscle',
		secondaryPlaceholder: 'Enter tag'
  };

	imgChipsAction = new EventEmitter<string|MaterializeAction>();
	imgChipsParams = {
		placeholder: '+Feature image',
		secondaryPlaceholder: 'Enter image path'
  };

  constructor(private baseService: BaseService,
			private muscleService: MuscleService,
			private exerciseService: ExerciseService,
			private location: Location,
			private router: Router) {
  }

	ngOnInit(){
		this.init();
		this.getMuscleList();

		// subscribe
		this.baseService.title$.subscribe(p => {this.title = p;});
		this.baseService.subtitle$.subscribe(p => {this.selectedMuscle = p;});
		this.baseService.ex$.subscribe(p => {
			this.exercise = p;

			if (this.exercise && this.exercise.muscle){
				this.muscleChipsParams["data"] = p["muscle"].map(m => {
					return { tag: m }
				});
				this.muscleChipsAction.emit({
					action:"material_chip",
					params: [this.muscleChipsParams]
				});
			} else if (this.exercise){
				this.exercise["muscle"] = [];
			}

			if (this.exercise && this.exercise.img){
				this.imgChipsParams["data"] = p["img"].map(img => {
					return { tag: img }
				});
				this.imgChipsAction.emit({
					action:"material_chip",
					params: [this.imgChipsParams]
				});
			} else if (this.exercise){
				this.exercise["img"] = [];
			}

			if (this.exercise && this.exercise.desc && this.exercise.desc.length > 0){
				let desc = this.exercise.desc.reduce((prev, line) => {
					return prev + "\n" + line;
				});
				this.exercise.desc = [desc];

			} else if (this.exercise){
				this.exercise.desc = [];
			}
		});
	}

// action
	back(){
		this.location.back();
	}

	route(muscleName: string){
		let link = (muscleName)
			? '/muscle/'+muscleName
			: '/';

		this.router.navigate([link]);
	}

	openUpdateModal() {
		this.updateModalAction.emit({action:"modal",params:['open']});
	}

	closeUpdateModal() {
    this.updateModalAction.emit({action:"modal",params:['close']});
  }

	confirmUpdate(){
		if (confirm("Confirm update?")){
			this.exerciseService.update(this.exercise)
				.subscribe(result => {
					console.log(result);
					toast("Updated", 3000, "teal white-text");
					this.closeUpdateModal();
				})
		}
	}

	starExercise(){
		let ex = this.exercise;
		toast("I'm not ready~",3000);
	}

	deleteInArray(array: string[], item: string){
		if (!array)
			return;

		let index = array.indexOf(item, 0);
		if (index > -1)
			array.splice(index, 1);
	}
// helper
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

	getMuscleList(){
		this.muscleService.getAll()
			.subscribe(voList => {
				this.muscleList = voList;


				//window.setTimeout(function(){
					this.muscleExt.forEach(m => {
						this.muscleList.push(m);
					})
				//}, 100);

				// Muscle name list
				let muscleNameList = {};
				this.muscleList
					.map(m => m.name)
					.map(name => {
						muscleNameList[name] = "";
					});

				// prepare auto complete options for muscle list
				this.muscleChipsParams["autocompleteOptions"] = {
					data: muscleNameList,
					limit: 3,
					minLength: 1
				}
			})
	}
}
