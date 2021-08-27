import { SimplifiedPlaylist } from "@models/playlist/simplified-playlist.model";
export interface HomeViewModel {
  message: string;
  items: SimplifiedPlaylist[];
}
