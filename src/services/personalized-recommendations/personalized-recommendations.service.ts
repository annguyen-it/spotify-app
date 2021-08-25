import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SimplifiedPlaylist } from "@models/playlist/simplified-playlist.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { APP_SETTINGS } from "../core/app-settings.service";

@Injectable({ providedIn: 'root' })
export class PersonalizedRecommendationsService {
  constructor(private http: HttpClient) { }

  getRecommendations(): Observable<SimplifiedPlaylist[][]> {
    const timestamp = new Date();
    const timeString = `${timestamp.toISOString()}`

    return this.http
      .get<any>(`${APP_SETTINGS.baseUrl}/v1/views/personalized-recommendations?content_limit=10&locale=en&platform=web&country=VN&timestamp=${timeString}&types=album,playlist,artist,show,station,episode&image_style=gradient_overlay`)
      .pipe(
        map<any, SimplifiedPlaylist[][]>((response) => {
          const collections: any[] = response.content.items;
          return collections.map((collection) => collection.content.items);
        })
      );
  }
}
