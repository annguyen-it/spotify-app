import { Component, ElementRef } from '@angular/core';
import { ContextMenuBase } from '../context-menu-base.component';

@Component({
  selector: 'spotify-playlist-context-menu',
  templateUrl: './playlist-context-menu.component.html',
  styleUrls: ['./playlist-context-menu.component.scss']
})
export class PlaylistContextMenuComponent extends ContextMenuBase {
  constructor(ref: ElementRef) {
    super(ref);
  }

  addToQueue(): void {
    
  }

  goToPlaylistRadio(): void {

  }

  addToLibrary(): void {

  }

  aboutRecommendations(): void {

  }
  
  openInDesktopApp(): void {
    
  }

  copyPlaylistLink(): void {

  }

  embedPlaylist(): void {

  }
}
