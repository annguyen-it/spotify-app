export class WebPlaybackTrack {
  uri!: string;
  id?: string;
  type!: 'track' | 'episode' | 'ad';
  mediaType!: 'audio' | 'video';
  name!: string;
  isPlayable!: boolean;
  album!: {
    uri: string;
    name: string;
    images: { url: string; }[];
  };
  artists!: { uri: string; name: string; }[];

  static parse(obj: any): WebPlaybackTrack {
    return {
      ...obj,
      mediaType: obj.media_type,
      isPlayable: obj.is_playable,
    };
  }
}
