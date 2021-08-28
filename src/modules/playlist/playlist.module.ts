import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './playlist.component';
import { PlaylistRoutingModule } from './playlist-routing.module';
import { BannerModule } from '@modules/shared/banner/banner.module';
import { BannerButtonGroupModule } from '@modules/shared/banner-button-group/banner-button-group.module';
import { TrackListModule } from '@modules/shared/track-list/track-list.module';

@NgModule({
  imports: [
    CommonModule,
    BannerModule,
    BannerButtonGroupModule,
    TrackListModule,
    PlaylistRoutingModule,
  ],
  declarations: [PlaylistComponent],
})
export class PlaylistModule { }
