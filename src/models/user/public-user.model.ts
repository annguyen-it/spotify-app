import { ExternalUrl } from "@models/core/external-url.model";
import { Image } from "../core/image.model";

export interface PublicUser {
  displayName: string;
  externalUrls: ExternalUrl;
  followers: any;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}
