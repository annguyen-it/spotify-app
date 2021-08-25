import { ExplicitContentSettings } from "@models/core/explicit-content-settings.model";
import { ExternalUrl } from "@models/core/external-url.model";
import { Image } from "@models/core/image.model";

export interface PrivateUser {
  country: string;
  displayName: string;
  email: string;
  explicit_content: ExplicitContentSettings;
  externalUrls: ExternalUrl;
  followers: any;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}
