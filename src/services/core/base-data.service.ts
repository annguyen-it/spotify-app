import { APP_SETTINGS } from '../app-settings.service';

export class BaseDataService {
  protected baseUrl = '';
  
  constructor() {
    this.baseUrl = APP_SETTINGS.baseUrl;
  }
}
