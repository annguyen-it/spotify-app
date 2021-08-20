import { ExampleModule } from '../shared/example/example.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';



@NgModule({
  imports:
    [CommonModule,
    /// Remove below
    ExampleModule
  ],
  declarations: [
    TopBarComponent
  ],
  exports: [
    TopBarComponent
  ]
})
export class TopBarModule { }
