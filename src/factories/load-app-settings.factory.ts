import { AppSettings } from "@models/core/app-settings.model";
import { SettingsService } from "@services/settings.service";

export function loadAppSettingAsync(appSettingsService: SettingsService): () => Promise<AppSettings> {
  return () => appSettingsService
    .loadAppSettingAsync()
    .toPromise();
}
