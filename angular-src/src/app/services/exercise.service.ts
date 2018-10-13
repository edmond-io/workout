import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {ApiService} from "./api.service";

@Injectable()
export class ExerciseService {
	endPoint: string;

  constructor(private apiService: ApiService) {
	  this.endPoint = 'exercise';
  }

	getAll(){
		return this.apiService.get(this.endPoint)
	}

	get(id){
		return this.apiService.get(`${this.endPoint}/${id}`)
	}

	getByName(name){
		return this.apiService.get(`${this.endPoint}/getByName/${name}`)
	}

	add(vo){
		return this.apiService.post(this.endPoint, vo)
	}

	delete(id){
		return this.apiService.delete(`${this.endPoint}/${id}`)
	}

	update(vo){
		return this.apiService.put(`${this.endPoint}/${vo._id}`, vo)
	}

}
