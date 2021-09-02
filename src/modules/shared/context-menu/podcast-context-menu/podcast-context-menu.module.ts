import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastContextMenuComponent } from './podcast-context-menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PodcastContextMenuComponent],
  exports: [PodcastContextMenuComponent]
})
export class PodcastContextMenuModule { }
