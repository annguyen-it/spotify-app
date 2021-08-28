import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    PipesModule
  ],
  declarations: [BannerComponent],
  exports: [BannerComponent]
})
export class BannerModule { }
