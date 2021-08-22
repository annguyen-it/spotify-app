import { UserProfileImage } from "./user-profile-image.model";

export interface UserProfile {
  displayName: string;
  externalUrls: { [key: string]: string };
  followers: any;
  href: string;
  id: string;
  images: UserProfileImage[];
  type: string;
  uri: string;
}
