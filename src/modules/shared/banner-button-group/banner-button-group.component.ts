import { Component, Input, OnInit } from '@angular/core';
import { SimplifiedPlaylist } from '@models/playlist/simplified-playlist.model';
import { PlaybackService } from '@services/playback.service';
import { PlayerService } from '@services/player.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'spotify-banner-button-group',
  templateUrl: './banner-button-group.component.html',
  styleUrls: ['./banner-button-group.component.scss']
})
export class BannerButtonGroupComponent implements OnInit {
  @Input() playlist!: SimplifiedPlaylist;
  @Input() like!:any;

  constructor(
    private playbackService: PlaybackService,
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {

  }
  playPlaylist(event: Event){
    event.stopPropagation();
    this.playerService
      .startNewPlayback(this.playbackService.deviceId.value, this.playlist.uri)
      .subscribe();
  }
}
