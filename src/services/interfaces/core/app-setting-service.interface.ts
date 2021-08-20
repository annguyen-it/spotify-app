import { AppSettings } from '@models/core/app-settings.model';
import { Observable } from 'rxjs';

export interface IAppSettingService {
  loadAppSettingAsync(): Observable<AppSettings>
}
