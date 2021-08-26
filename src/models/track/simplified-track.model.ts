import { SimplifiedArtist } from "@models/artist/simplified-artist.model";
import { ExternalUrl } from "@models/core/external-url.model";
import { LinkedTrack } from "./linked-track.model";
import { TrackRestriction } from "./track-restriction.model";

export interface SimplifiedTrack {
  artists: SimplifiedArtist[];
  availableMarkets: string[];
  discNumber: number;
  durationMs: number;
  explicit: boolean;
  externalUrls: ExternalUrl;
  href: string;
  id: string;
  isLocal: string;
  isPlayable: boolean;
  linkedFrom: LinkedTrack;
  name: string;
  previewUrl: string;
  restrictions: TrackRestriction;
  trackNumber: number;
  type: string;
  uri: string;
}
