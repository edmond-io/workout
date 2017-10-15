import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MuscleService } from '../../services/muscle.service';
import { ExerciseService } from '../../services/exercise.service';
import { Category } from '../../model/category';
import { Muscle } from '../../model/muscle';
import { Exercise } from '../../model/exercise';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss']
})
export class HelperComponent implements OnInit {
	cats: Category[];
	cat_name: string;
	cat_img: string;
	cat_id: string;

	muscleList: Muscle[];
	muscle__id: string;
	muscle_seq: number;
	muscle_name: string;
	muscle_cname: string;
	muscle_img: string;
	muscle_desc: string;


	exerciseList: Exercise[];
	ex_id: number;
	ex_name: string;
	ex_cname: string;
	ex_muscle_name: string;
	ex_min_reps: number;
	ex_max_reps: number; // Optional
	ex_min_sets: number;
	ex_max_sets; number; // Optional
	ex_desc: string[];
	ex_img_paths: string[];

  constructor(private categoryService: CategoryService,
			private muscleService: MuscleService,
			private exerciseService: ExerciseService) {


	  this.categoryService.getCategories()
  		.subscribe(categories =>{
				this.cats = categories;
  		})

  	this.reloadMuscle();
  }

  delegateMuscle(vo){
	  this.muscle__id = vo._id;
	  this.muscle_name = vo.name;
		this.muscle_cname = vo.cname;
		this.muscle_img = vo.img;
		this.muscle_desc = vo.desc;
		this.muscle_seq = vo.seq;
  }

  reloadMuscle(){
	  this.muscleService.getAll()
  		.subscribe(voList =>{
				this.muscleList = voList;
  		});
  }

  submitMuscle(event){
	  event.preventDefault();
		var vo = {
			_id: this.muscle__id, // for updates
			name: this.muscle_name,
			cname: this.muscle_cname,
			img: this.muscle_img,
			desc: this.muscle_desc,
			seq: this.muscle_seq
		}

		if (this.muscle__id){
			this.updateMuscle(vo);
		} else {
			this.addMuscle(vo);
		}

  }

  addMuscle(vo){
		this.muscleService.add(vo)
			.subscribe(newVo => {
				this.muscleList.push(newVo);
				this.muscleList = this.muscleList.slice();
				toast("Muscle added: " + newVo.name,3000);
			},err => {
				toast(err, 3000, "red white-text");
			})
  }

  updateMuscle(vo){
		this.muscleService.update(vo)
			.subscribe(data => {
				this.reloadMuscle();

				toast("Updated: " + vo.name, 3000);
				this.muscle__id = '';
			},err => {
				toast(err, 3000, "red white-text");
			})
	}


  deleteMuscle(id){
	  if(confirm("Delete")){
		  var voList = this.muscleList;

		  this.muscleService.delete(id)
		  	.subscribe(data => {
			  	console.log("delete - " + id);
			  	if (data.n == 1){
				  	for (var i = 0; i < voList.length; i++){
					  	if (voList[i]._id == id){
						  	voList.splice(i, 1);
					  	}
				  	}
				  	toast("Deleted", 3000);
			  	}
		  	},err => {
					toast(err, 3000, "red white-text");
				});
		}
  }


  addExercise(event){
	  event.preventDefault();
		var vo = {
			ex_id: this.ex_id,
			name: this.ex_name,
			cname: this.ex_cname,
			muscle_name: this.ex_muscle_name,
			min_reps: this.ex_min_reps,
			max_reps: this.ex_max_reps,
			min_sets: this.ex_min_sets,
			max_sets: this.ex_max_sets,
			desc: [this.ex_desc],
			img_paths: [this.ex_img_paths]
		}

		this.exerciseService.add(vo)
			.subscribe(newVo => {
				// TODO
				toast("Exercise added: "+newVo.muscle_name,3000);
			},err => {
				toast(err, 3000, "red white-text");
			})

  }


  ngOnInit() {
  }

}
