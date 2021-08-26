import { ExternalUrl } from "@models/core/external-url.model";

export interface LinkedTrack {
  externalUrls: ExternalUrl;
  href: string;
  id: string;
  type: string;
  uri: string;
}
