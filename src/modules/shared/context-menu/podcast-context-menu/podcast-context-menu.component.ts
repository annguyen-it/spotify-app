import { Component, ElementRef } from '@angular/core';
import { ContextMenuBase } from '../context-menu-base.component';

@Component({
  selector: 'spotify-podcast-context-menu',
  templateUrl: './podcast-context-menu.component.html',
  styleUrls: ['./podcast-context-menu.component.scss']
})
export class PodcastContextMenuComponent extends ContextMenuBase {
  constructor(ref: ElementRef) {
    super(ref);
  }

  ngOnInit(): void {
  }

  follow(): void {
    
  }
  
  openInDesktopApp(): void {
    
  }

  copyShowLink(): void {

  }

  embedShow(): void {

  }
}
