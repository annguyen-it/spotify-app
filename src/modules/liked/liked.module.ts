import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikedComponent } from './liked.component';
import {LikedRoutingModule} from "@modules/liked/liked-routing.module";
import {BannerModule} from "@modules/shared/banner/banner.module";
import {BannerButtonGroupModule} from "@modules/shared/banner-button-group/banner-button-group.module";
import {TrackListModule} from "@modules/shared/track-list/track-list.module";



@NgModule({
  declarations: [
    LikedComponent
  ],
  imports: [
    CommonModule,
    LikedRoutingModule,
    BannerModule,
    BannerButtonGroupModule,
    TrackListModule,
  ],
  exports: [
    LikedComponent
  ]
})
export class LikedModule { }
