import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule
  ],
  declarations: [TopBarComponent],
  exports: [TopBarComponent]
})
export class TopBarModule { }
