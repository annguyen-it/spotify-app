import { ExternalUrl } from "@models/core/external-url.model";
import { Image } from "@models/core/image.model";
import { Followers } from "@models/follower/followers.model";
import { TracksInResponse } from "@models/track/tracks-in-response.model";
import { PublicUser } from "@models/user/public-user.model";

export class Playlist {
  collaborative!: boolean;
  description!: string;
  externalUrls!: ExternalUrl;
  followers!: Followers;
  href!: string;
  id!: string;
  images!: Image[];
  name!: string;
  owner!: PublicUser;
  public!: boolean;
  snapshotId!: string;
  tracks!: TracksInResponse;
  type!: string;
  uri!: string;

  static parse(obj: any): Playlist {
    return {
      ...obj,
      externalUrls: obj.external_urls,
      owner: PublicUser.parse(obj.owner),
      tracks: TracksInResponse.parse(obj.tracks)
    }
  }
}
