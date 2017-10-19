import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { MuscleService } from '../../services/muscle.service';
import { Muscle } from '../../model/muscle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	muscleList: Muscle[];

  constructor(private baseService: BaseService,
			private muscleService: MuscleService) {
		this.baseService.reset();
  }

  ngOnInit(){
	  this.muscleService.getAll()
  		.subscribe(voList =>{
				this.muscleList = voList;
  		});
  }
}
