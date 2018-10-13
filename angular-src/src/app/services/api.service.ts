import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
	private serverAddress: string;
	
  constructor(private http: Http) {

  }

  load(){
    return new Promise((resolve, reject) => {
      this.http.get(window.location.origin + '/env')
        .map(res => res.json())
        .subscribe(env => {
          sessionStorage.setItem('serverAddress', env.server);
          this.serverAddress = env.server;
          resolve(true);

        }, (err: any) => {
          // enable fallback mode
          console.log("Unable to load server env properties, enable fallback mode.", err);
          sessionStorage.setItem('serverAddress', environment.server);
          this.serverAddress = environment.server;
          return Observable.throw(err.json().error || 'Server error')
        })
    })
  }

  getEndpoint(url: string): string{
    let serverAddr = sessionStorage.getItem('serverAddress');
    if (url) return serverAddr + url;

    return serverAddr;
  }

  // retrieve
	get(url: string){
		return this.http.get(this.getEndpoint(url))
      .map(res => res.json())
	}

	// create
	post(url: string, vo){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.getEndpoint(url), JSON.stringify(vo), {headers: headers})
      .map(res => res.json())
      .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
  }

  // update
  put(url: string, vo){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.getEndpoint(url), JSON.stringify(vo), {headers: headers})
      .map(res => res.json())
      .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
  }

  // delete
  delete(url: string){
    return this.http.delete(this.getEndpoint(url))
      .map(res => res.json())
      .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
  }
}
