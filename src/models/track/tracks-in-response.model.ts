import { PlaylistTrack } from "./play-list-track.model";

export class TracksInResponse {
  href!: string;
  items!: PlaylistTrack[];
  limit!: number;
  next!: number;
  offset!: number;
  previous!: number;
  total!: number;

  static parse(obj: any): TracksInResponse {
    return {
      ...obj,
      items: obj.items.map((x: any) => PlaylistTrack.parse(x))
    };
  }
}
