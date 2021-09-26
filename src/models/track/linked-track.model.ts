import { ExternalUrl } from "@models/core/external-url.model";

export class LinkedTrack {
  externalUrls!: ExternalUrl;
  href!: string;
  id!: string;
  type!: string;
  uri!: string;

  static parse(obj: any): LinkedTrack | undefined {
    if (!obj){
      return undefined;
    }

    return {
      ...obj,
      externalUrls: obj.externalUrls
    };
  }
}
