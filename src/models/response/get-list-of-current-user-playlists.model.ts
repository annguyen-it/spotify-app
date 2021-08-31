import { SimplifiedPlaylist } from "@models/playlist/simplified-playlist.model";

export class GetListOfCurrentUserPlaylistsResponse {
  href!: string;
  items!: SimplifiedPlaylist[];
  limit!: number;
  offset!: number;

  static parse(obj: any): GetListOfCurrentUserPlaylistsResponse {
    return {
      ...obj,
      items: obj.items.map((x: any) => SimplifiedPlaylist.parse(x))
    }
  }
}
