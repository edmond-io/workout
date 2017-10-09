import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
	private endPointUrl: string;
	
  constructor(public _http: Http) { 
	  this.endPointUrl = environment.server;
  }
  
	get(url: string){
		return this._http.get(environment.server+url);
	}
}
