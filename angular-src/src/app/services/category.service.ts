import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {
	endPoint: string;
	
  constructor(private apiService: ApiService) {
	  this.endPoint = 'category/';
  }

	getCategories(){
		return this.apiService.get(this.endPoint)
	}
	
	addCategory(newCat){
		return this.apiService.post(this.endPoint, newCat)
	}
	
	deleteCategory(id){
		return this.apiService.delete(this.endPoint+id);
	}
	
	updateCategory(cat){
		return this.apiService.put(this.endPoint+cat._id, cat)
	}
	
}
