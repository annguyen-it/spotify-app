import { WebPlaybackTrack } from "./web-playback-track.model";

export interface WebPlaybackState {
  context: {
    uri: string;
    metadata: any;
  };
  disallows: {
    pausing: boolean;
    peekingNext: boolean;
    peekingPrev: boolean;
    resuming: boolean;
    seeking: boolean;
    skippingNext: boolean;
    skippingPrev: boolean;
  };
  paused: boolean;
  position: number;
  repeatMode: number;
  shuffle: boolean;
  trackWindow: {
    currentTrack: WebPlaybackTrack;
    previousTrack: WebPlaybackTrack[];
    nextTracks: WebPlaybackTrack[];
  }
}
