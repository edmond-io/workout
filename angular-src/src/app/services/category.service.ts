import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {
	endPoint: string;
	
  constructor(private http: Http) { 
	  //super(_apiService);
	  console.log('Category Service Initialized...');
	  this.endPoint = environment.server+'category/';
  }

	getCategories(){
		return this.http.get(this.endPoint)
				.map(res => res.json())
				.catch((err:any) => Observable.throw(err.json().error || 'Server error'));
	}
	
	addCategory(newCat){
		
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post(this.endPoint, JSON.stringify(newCat), {headers: headers})
			.map(res => res.json())
			.catch((err:any) => Observable.throw(err.json().error || 'Server error'));
			
	}
	
	deleteCategory(id){
		
		return this.http.delete(this.endPoint+id)
				.map(res => res.json())
				.catch((err:any) => Observable.throw(err.json().error || 'Server error'));
				
	}
	
	updateCategory(cat){
		
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put(this.endPoint+cat._id, JSON.stringify(cat), {headers: headers})
			.map(res => res.json())
			.catch((err:any) => Observable.throw(err.json().error || 'Server error'));
	}
	
}
