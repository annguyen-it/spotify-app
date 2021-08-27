export interface WebPlaybackTrack {
  uri: string;
  id: string;
  type: string;
  mediaType: string;
  name: string;
  isPlayable: boolean;
  album: {
    uri: string;
    name: string;
    images: { url: string; }[];
  };
  artists: { uri: string; name: string; }[];
}
