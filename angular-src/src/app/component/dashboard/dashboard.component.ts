import { Component, OnInit } from '@angular/core';
import { MuscleService } from '../../services/muscle.service';
import { Muscle } from '../../model/muscle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	muscleList: Muscle[];

  constructor(private muscleService: MuscleService) {

  }

  reloadMuscle(){
	  this.muscleService.getAll()
  		.subscribe(voList =>{
				this.muscleList = voList;
  		});
  }

  ngOnInit(){
	  this.reloadMuscle();
  }
}
