import { Component } from '@angular/core';
import { Services } from './services/services.service';
import { ApiService } from './services/api.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public services: Services,
    apiService: ApiService,
    utilsService: UtilsService
  ) {
    this.services.apiService = apiService;
    this.services.utilsService = utilsService;
  }
}
