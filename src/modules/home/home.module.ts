import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PlaylistDetailsModule } from '@modules/shared/playlist-details/playlist-details.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    PlaylistDetailsModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
