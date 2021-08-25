import { ExternalUrl } from "@models/core/external-url.model";
import { Image } from "@models/core/image.model";
import { PublicUser } from "@models/user/public-user.model";
import { PlaylistTracksRef } from "./playlist-tracks-ref.model";

export interface SimplifiedPlaylist {
  collaborative: boolean;
  description: string;
  externalUrls: ExternalUrl;
  href: string;
  id: string;
  images: Image[];
  name: String;
  owner: PublicUser;
  public: boolean;
  snapshotId: string;
  tracks: PlaylistTracksRef;
  type: string;
  uri: string;
}
