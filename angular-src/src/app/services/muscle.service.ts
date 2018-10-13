import { Injectable } from '@angular/core';;
import { ApiService } from './api.service';
import 'rxjs/add/operator/map';

@Injectable()
export class MuscleService {
	endPoint: string;

  constructor(private apiService: ApiService) {
	  this.endPoint = 'muscle/';
  }

	getAll(){
		return this.apiService.get(this.endPoint)
	}

	get(id){
		return this.apiService.get(this.endPoint+id)
	}

	add(vo){
		return this.apiService.post(this.endPoint, vo)
	}

	delete(id){
		return this.apiService.delete(this.endPoint+id)
	}

	update(vo){
		return this.apiService.put(this.endPoint+vo._id, vo)
	}

}
