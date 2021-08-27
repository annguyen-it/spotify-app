import { ExternalUrl } from "@models/core/external-url.model";

export interface Context {
  externalUrls: ExternalUrl;
  href: string;
  type: string;
  uri: string;
}
