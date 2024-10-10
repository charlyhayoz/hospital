import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class Services {
  public apiService!: ApiService;
  public utilsService!: UtilsService;
  constructor() {}
}
