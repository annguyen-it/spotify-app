import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@models/core/image.model';
import { PlaylistTrack } from '@models/track/play-list-track.model';
import { PublicUser } from '@models/user/public-user.model';

@Component({
  selector: 'spotify-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() image!: Image;
  @Input() title!: string;
  @Input() uponText?: string;
  @Input() description?: string;
  @Input() owner!: PublicUser;
  @Input() tracks?: PlaylistTrack[];
  @Input() releaseTime?: string;
  @Input() displayDuration?: boolean;

  duration?: number;

  constructor() { }

  ngOnInit(): void {
    this.duration = this.tracks?.reduce((acc, curr) => {
      return acc + curr.track!.durationMs;
    }, 0);
  }
}
