import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class MuscleService {
	endPoint: string;

  constructor(private http: Http) { 	  
	  this.endPoint = environment.server+'muscle/';
  }

	getAll(){
		return this.http.get(this.endPoint)
				.map(res => res.json())
				.catch((err:any) => Observable.throw(err.json().error || 'Server error'));
	}


	get(id){
		return this.http.get(this.endPoint+id)
				.map(res => res.json())
				.catch((err:any) => Observable.throw(err.json().error || 'Server error'));
	}

	add(vo){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post(this.endPoint, JSON.stringify(vo), {headers: headers})
			.map(res => res.json())
			.catch((err:any) => Observable.throw(err.json().error || 'Server error'));

	}

	delete(id){
		return this.http.delete(this.endPoint+id)
				.map(res => res.json())
				.catch((err:any) => Observable.throw(err.json().error || 'Server error'));

	}

	update(vo){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put(this.endPoint+vo._id, JSON.stringify(vo), {headers: headers})
			.map(res => res.json())
			.catch((err:any) => Observable.throw(err.json().error || 'Server error'));
	}

}
