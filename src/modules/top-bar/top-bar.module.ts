import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import { DirectivesModule } from '@directives/directives.module';
import { TopBarContextMenuModule } from '@modules/shared/context-menu/top-bar-context-menu/top-bar-context-menu.module';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    TopBarContextMenuModule,
  ],
  declarations: [TopBarComponent],
  exports: [TopBarComponent]
})
export class TopBarModule { }
