import { SpotifyAuthorize } from '@models/core/spotify-authorize.model';
import { SettingsService } from '@services/settings.service';

export function loadSpotifyAuthorizeAsync(settingService: SettingsService): () => Promise<SpotifyAuthorize> {
  return () => settingService
    .loadSpotifyAuthorizeAsync()
    .toPromise();
}
