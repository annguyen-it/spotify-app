import { ExternalUrl } from "@models/core/external-url.model";

export interface SimplifiedArtist {
  externalUrls: ExternalUrl;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
