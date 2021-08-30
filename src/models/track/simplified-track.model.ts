import { SimplifiedArtist } from "@models/artist/simplified-artist.model";
import { ExternalUrl } from "@models/core/external-url.model";
import { LinkedTrack } from "./linked-track.model";
import { TrackRestriction } from "./track-restriction.model";

export class SimplifiedTrack {
  artists!: SimplifiedArtist[];
  availableMarkets!: string[];
  discNumber!: number;
  durationMs!: number;
  explicit!: boolean;
  externalUrls!: ExternalUrl;
  href!: string;
  id!: string;
  isLocal!: string;
  isPlayable!: boolean;
  linkedFrom!: LinkedTrack;
  name!: string;
  previewUrl!: string;
  restrictions!: TrackRestriction;
  trackNumber!: number;
  type!: string;
  uri!: string;

  static parse(obj: any): SimplifiedArtist {
    return {
      ...obj,
      artists: obj.artists?.map((x: any) => SimplifiedArtist.parse(x)),
      availableMarkets: obj.available_markets,
      discNumber: obj.disc_number,
      durationMs: obj.duration_ms,
      externalUrls: obj.external_urls,
      isPlayable: obj.is_playable,
      linkedFrom: LinkedTrack.parse(obj.linked_from),
      previewUrl: obj.preview_url,
      trackNumber: obj.track_number
    };
  }
}
