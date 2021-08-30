import { ExternalUrl } from "@models/core/external-url.model";
import { Image } from "@models/core/image.model";
import { AlbumRestriction } from "./album-restriction.model";

export class SimplifiedAlbum {
  albumType!: string;
  availableMarkets!: string[];
  externalUrls!: ExternalUrl;
  href!: string;
  id!: string;
  images!: Image[];
  name!: string;
  releaseDate!: string;
  releaseDatePrecision!: string;
  restrictions!: AlbumRestriction;
  totalTracks!: number;
  type!: string;
  uri!: string;

  static parse(obj: any): SimplifiedAlbum | undefined {
    if (!obj){
      return undefined;
    }

    return {
      ...obj,
      albumType: obj.album_type,
      availableMarkets: obj.available_markets,
      externalUrls: obj.external_urls,
      releaseDate: obj.release_date,
      releaseDatePrecision: obj.release_date_precision,
      restrictions: obj.restrictions,
      totalTracks: obj.total_tracks,
    };
  }
}
