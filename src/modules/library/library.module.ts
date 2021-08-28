import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { CardModule } from '@modules/shared/card/card.module';
import { LibraryRoutingModule } from './library-routing.module';
import { PlaylistDetailsModule } from '@modules/shared/playlist-details/playlist-details.module';

@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule,
    PlaylistDetailsModule,
  ],
  declarations: [LibraryComponent],
  exports: [LibraryComponent]
})
export class LibraryModule { }
