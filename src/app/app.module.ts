import { TopBarModule } from './top-bar/top-bar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { PlayBarModule } from './play-bar/play-bar.module';
import { MainViewModule } from './main-view/main-view.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    MainViewModule,
    PlayBarModule,
    SidebarModule,
    TopBarModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
