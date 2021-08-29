import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { PlaylistDetailsModule } from '@modules/shared/playlist-details/playlist-details.module';

@NgModule({
  imports: [
    CommonModule,
    PlaylistDetailsModule,
  ],
  declarations: [LibraryComponent],
  exports: [LibraryComponent]
})
export class LibraryModule { }
