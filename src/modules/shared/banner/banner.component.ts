import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Image } from '@models/core/image.model';
import { PlaylistTrack } from '@models/track/play-list-track.model';
import { PublicUser } from '@models/user/public-user.model';
import Vibrant from 'node-vibrant';

@Component({
  selector: 'spotify-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, AfterViewInit {
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

  ngOnInit(): void {
    this.duration = this.tracks?.reduce((acc, curr) => {
      return acc + curr.track!.durationMs;
    }, 0);
  }

  ngAfterViewInit(): void {
    Vibrant.from(this.image.url)
      .quality(5)
      .getPalette()
      .then((palette: any) => {
        console.log(palette);
        this.renderer.setStyle(this.background.nativeElement, 'background-color', `rgb(${palette.DarkMuted._rgb.join(',')})`);
      });

    this.renderer.setStyle(this.background.nativeElement, 'background', `background: linear-gradient(transparent 0,rgba(0,0,0,0.5) 100%), url(${this.image.url});`);
  }
}
