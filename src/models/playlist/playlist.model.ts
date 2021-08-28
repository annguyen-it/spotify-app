import { ExternalUrl } from "@models/core/external-url.model";
import { Image } from "@models/core/image.model";
import { Followers } from "@models/follower/followers.model";
import { PublicUser } from "@models/user/public-user.model";

export interface Playlist {
  collaborative: string;
  description: string;
  externalUrls: ExternalUrl;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: PublicUser;
  public: boolean;
  snapshotId: string;
  tracks: any;
  type: string;
  uri: string;
}
