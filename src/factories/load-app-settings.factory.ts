import { AppSettings } from "@models/core/app-settings.model";
import { AppSettingsService } from "@services/app-settings.service";

export function loadAppSettingAsync(appSettingsService: AppSettingsService): () => Promise<AppSettings> {
  return () => appSettingsService
    .loadAppSettingAsync()
    .toPromise();
}
