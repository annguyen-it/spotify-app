import { WebPlaybackTrack } from "./web-playback-track.model";

export class WebPlaybackState {
  context!: {
    uri?: string;
    metadata?: any;
  };
  disallows!: {
    pausing: boolean;
    peekingNext: boolean;
    peekingPrev: boolean;
    resuming: boolean;
    seeking: boolean;
    skippingNext: boolean;
    skippingPrev: boolean;
  };
  paused!: boolean;
  duration!: number;
  position!: number;
  repeatMode!: number;
  shuffle!: boolean;
  trackWindow!: {
    currentTrack: WebPlaybackTrack;
    previousTrack: WebPlaybackTrack[];
    nextTracks: WebPlaybackTrack[];
  };

  static parse(obj: any): WebPlaybackState | undefined {
    if (!obj){
      return undefined;
    }

    return {
      ...obj,
      disallows: {
        ...obj.disallows,
        peekingNext: obj.disallows.peeking_next,
        peekingPrev: obj.disallows.peeking_prev,
        skippingNext: obj.disallows.skipping_next,
        skippingPrev: obj.disallows.skipping_prev
      },
      repeatMode: obj.repeat_mode,
      trackWindow: {
        currentTrack: WebPlaybackTrack.parse(obj.track_window.current_track),
        previousTrack: obj.track_window.previous_tracks.map((x: any) => WebPlaybackTrack.parse(x)),
        nextTracks: obj.track_window.next_tracks.map((x: any) => WebPlaybackTrack.parse(x))
      }
    };
  }
}
