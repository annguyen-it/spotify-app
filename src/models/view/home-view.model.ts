import { SimplifiedPlaylist } from "@models/playlist/simplified-playlist.model";
import { SimplifiedTrack } from "@models/track/simplified-track.model";

export interface HomeViewModel {
  message: string;
  items: SimplifiedPlaylist[];
}
