import { SimplifiedPlaylist } from "@models/playlist/simplified-playlist.model";

export interface GetListOfCurrentUserPlaylists {
  href: string;
  items: SimplifiedPlaylist[];
  limit: number;
  offset: number;
}
