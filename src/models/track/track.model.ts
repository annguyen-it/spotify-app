import { SimplifiedAlbum } from "@models/album/simplified-album.model";
import { SimplifiedArtist } from "@models/artist/simplified-artist.model";
import { ExternalId } from "@models/core/external-id.model";
import { ExternalUrl } from "@models/core/external-url.model";
import { TrackRestriction } from "./track-restriction.model";

export class Track {
  album!: SimplifiedAlbum;
  artists!: SimplifiedArtist[];
  availableMarkets!: string[];
  discNumber!: number;
  durationMs!: number;
  explicit!: boolean;
  externalIds!: ExternalId;
  externalUrls!: ExternalUrl;
  href!: string;
  id!: string;
  isLocal!: boolean;
  isPlayable!: boolean;
  linkedFrom!: any;
  name!: string;
  popularity!: number;
  previewUrl!: string;
  restrictions!: TrackRestriction;
  trackNumber!: number;
  type!: string;
  uri!: string;

  static parse(obj: any): Track | undefined {
    if (!obj){
      return undefined;
    }

    return {
      ...obj,
      album: SimplifiedAlbum.parse(obj.album),
      artists: obj.artists?.map((x: any) => SimplifiedArtist.parse(x)),
      availableMarkets: obj.available_markets,
      discNumber: obj.disc_number,
      durationMs: obj.duration_ms,
      externalIds: obj.external_ids,
      externalUrls: obj.external_urls,
      isLocal: obj.is_local,
      isPlayable: obj.is_playable,
      linkedFrom: obj.linked_from,
      previewUrl: obj.preview_url,
      trackNumber: obj.track_number,
    };
  }
}
