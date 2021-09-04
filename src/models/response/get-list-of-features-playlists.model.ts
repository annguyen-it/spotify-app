import { SimplifiedPlaylist } from "@models/playlist/simplified-playlist.model";

export class GetListOfFeaturedPlaylistsResponse {
  message!: string;
  playlists!: {
    href: string;
    items: SimplifiedPlaylist[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };

  static parse(obj: any): GetListOfFeaturedPlaylistsResponse {
    return {
      ...obj,
      playlists: {
        ...obj.playlists,
        externalUrls: obj.playlists.external_urls,
        snapshotId: obj.playlists.snapshot_id,
      }
    }
  }
}
