import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { PipesModule } from '@pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '@directives/directives.module';
import { PlaylistContextMenuModule } from '../context-menu/playlist-context-menu/playlist-context-menu.module';
import { PodcastContextMenuModule } from '../context-menu/podcast-context-menu/podcast-context-menu.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    DirectivesModule,
    PlaylistContextMenuModule,
    PodcastContextMenuModule
  ],
  declarations: [CardComponent],
  exports: [CardComponent]
})
export class CardModule { }
