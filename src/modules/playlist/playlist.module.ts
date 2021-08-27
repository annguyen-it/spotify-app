import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './playlist.component';
import { PlaylistRoutingModule } from './playlist-routing.module';

@NgModule({
  imports: [
    PlaylistRoutingModule,
    CommonModule
  ],
  declarations: [PlaylistComponent],
})
export class PlaylistModule { }
