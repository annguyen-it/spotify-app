import { ExternalUrl } from "@models/core/external-url.model";
import { Image } from "../core/image.model";

export class PublicUser {
  displayName!: string;
  externalUrls!: ExternalUrl;
  followers!: any;
  href!: string;
  id!: string;
  images!: Image[];
  type!: string;
  uri!: string;

  static parse(obj: any): PublicUser {
    return {
      ...obj,
      displayName: obj.display_name,
      externalUrls: obj.external_urls
    }
  }
}
