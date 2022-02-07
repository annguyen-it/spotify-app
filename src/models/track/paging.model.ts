import { SimplifiedPlaylist } from "@models/playlist/simplified-playlist.model";

export class Paging {
    href!: string;
    items!: SimplifiedPlaylist[];
    limit!: number;
    next!: string;
    offset!: number;
    previous!: string;
    total!: number;

    static parse(obj: any): Paging {
      return {
        ...obj,
      };
    }
}