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
      // .map(res => res.json())
	}

	get(id){
		return this.apiService.get(this.endPoint+id)
      // .map(res => res.json())
	}

	add(vo){
		return this.apiService.post(this.endPoint, vo)
      // .map(res => res.json())
	}

	delete(id){
		return this.apiService.delete(this.endPoint+id)
      // .map(res => res.json())
	}

	update(vo){
		return this.apiService.put(this.endPoint+vo._id, vo)
      // .map(res => res.json())
	}

}
