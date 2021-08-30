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
  position!: number;
  repeatMode!: number;
  shuffle!: boolean;
  trackWindow!: {
    currentTrack: WebPlaybackTrack;
    previousTrack: WebPlaybackTrack[];
    nextTracks: WebPlaybackTrack[];
  };

  static parse(obj: any): WebPlaybackState | null {
    if (!obj){
      return null;
    }

    return {
      ...obj,
      disallows: {
        ...obj.disallows,
        peekingNext: obj.peeking_next,
        peekingPrev: obj.peeking_prev,
        skippingNext: obj.skipping_next,
        skippingPrev: obj.skipping_prev
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
