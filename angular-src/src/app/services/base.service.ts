import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Exercise } from '../model/exercise';

@Injectable()
export class BaseService {
	// Observable sources
	private titleSource = new Subject<string>();
	private subtitleSource = new Subject<string>();
	private exerciseSource = new Subject<Exercise>();

	// Observable string streams
	title$ = this.titleSource.asObservable();
	subtitle$ = this.subtitleSource.asObservable();
	ex$ = this.exerciseSource.asObservable();

  // Service message commands
	setTitle(title: string){
		this.titleSource.next(title);
	}
	setExercise(ex){
		if (ex == null)
			this.setTitle("");
		else
			this.setTitle(ex.cname);

		this.exerciseSource.next(ex);
	}

	setSubtitle(subtitle: string){
		console.log("setSubtitle",subtitle);
		this.subtitleSource.next(subtitle);
		this.setExercise(null); // assume switch muscle has no detail
	}

	reset(){
		this.setSubtitle(null);
	}
}
