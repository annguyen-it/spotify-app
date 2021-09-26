import { PublicUser } from "@models/user/public-user.model";
import { Track } from "./track.model";

export class PlaylistTrack {
  addedAt!: string;
  addedBy!: PublicUser;
  isLocal!: boolean;
  track!: Track;

  static parse(obj: any): PlaylistTrack {
    return {
      ...obj,
      addedAt: obj.added_at,
      addedBy: obj.added_by,
      isLocal: obj.is_local,
      track: Track.parse(obj.track)
    };
  }
}
