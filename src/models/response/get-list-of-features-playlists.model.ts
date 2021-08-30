import { SimplifiedPlaylist } from "@models/playlist/simplified-playlist.model";

export interface GetListOfFeaturedPlaylistsResponse {
  message: string;
  playlists: {
    href: string;
    items: SimplifiedPlaylist[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
}
