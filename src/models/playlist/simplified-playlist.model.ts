import { ExternalUrl } from "@models/core/external-url.model";
import { Image } from "@models/core/image.model";
import { PublicUser } from "@models/user/public-user.model";
import { PlaylistTracksRef } from "./playlist-tracks-ref.model";

export class SimplifiedPlaylist {
  collaborative!: boolean;
  description!: string;
  externalUrls!: ExternalUrl;
  href!: string;
  id!: string;
  images!: Image[];
  name!: string;
  owner!: PublicUser;
  public!: boolean;
  snapshotId!: string;
  tracks!: PlaylistTracksRef;
  type!: string;
  uri!: string;

  static parse(obj: any): SimplifiedPlaylist {
    return {
      ...obj,
      externalUrls: obj.external_urls,
      owner: PublicUser.parse(obj.owner),
      snapshotId: obj.snapshot_id,
    }
  }
}
