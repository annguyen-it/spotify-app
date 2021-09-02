import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistContextMenuComponent } from './playlist-context-menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PlaylistContextMenuComponent],
  exports: [PlaylistContextMenuComponent]
})
export class PlaylistContextMenuModule { }
