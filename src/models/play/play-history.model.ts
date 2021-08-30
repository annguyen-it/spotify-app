import { Context } from "@models/context/context.model";
import { SimplifiedTrack } from "@models/track/simplified-track.model";

export interface PlayHistory {
  context: Context;
  playedAt: string;
  track: SimplifiedTrack;
}
