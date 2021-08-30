import { ExternalUrl } from "@models/core/external-url.model";

export class SimplifiedArtist {
  externalUrls!: ExternalUrl;
  href!: string;
  id!: string;
  name!: string;
  type!: string;
  uri!: string;

  static parse(obj: any): SimplifiedArtist {
    return {
      ...obj, 
      externalUrls: obj.external_urls
    };
  }
}
