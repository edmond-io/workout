import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
	private endPointUrl: string;
	
  constructor(private _http: Http) {
    this._http
      .get(window.location.origin + '/env')
      .map((response: Response) => response.json())
      .subscribe(env => {
        sessionStorage.setItem('endPointUrl', env.server);
        this.endPointUrl = env.server;
      }, () => {
        // enable fallback mode
        console.log("Unable to load server env properties, enable fallback mode.");
        sessionStorage.setItem('endPointUrl', environment.server);
        this.endPointUrl = environment.server;
      });
  }
  
	get(url: string){
		return this._http.get(this.endPointUrl + url);
	}
}
