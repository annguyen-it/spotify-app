import { AfterViewInit, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Image } from '@models/core/image.model';
import { PlaylistTrack } from '@models/track/play-list-track.model';
import { PublicUser } from '@models/user/public-user.model';
import { VibrantService } from '@services/vibrant.service';

@Component({
  selector: 'spotify-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnChanges, AfterViewInit {
  duration?: number;

  @Input() image!: Image;
  @Input() title!: string;
  @Input() uponText?: string;
  @Input() description?: string;
  @Input() owner!: PublicUser;
  @Input() tracks?: PlaylistTrack[];
  @Input() releaseTime?: string;
  @Input() displayDuration?: boolean;
  @ViewChild('background') background!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    const tracks = changes.tracks.currentValue;

    if (tracks) {
      this.duration = tracks.reduce((acc: number, curr: PlaylistTrack) => {
        return acc + (curr.track ? curr.track.durationMs : 0);
      }, 0);
    }
  }

  async ngAfterViewInit(): Promise<void> {
    const generatedColor = await VibrantService.generateColor(this.image.url);
    this.renderer.setStyle(this.background.nativeElement, 'background-color', generatedColor);
    this.renderer.setStyle(this.background.nativeElement, 'background', `background: linear-gradient(transparent 0,rgba(0,0,0,0.5) 100%), url(${this.image.url});`);
  }
}
