import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { toast } from 'angular2-materialize';

@Injectable()
export abstract class BaseService {

  constructor(protected apiService: ApiService) { }

}
