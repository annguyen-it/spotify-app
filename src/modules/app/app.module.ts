import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { loadAppSettingAsync } from '@factories/load-app-settings.factory';
import { InterceptorsModule } from '@interceptors/interceptors.module';

import { SidebarModule } from '../sidebar/sidebar.module';
import { PlayBarModule } from '../play-bar/play-bar.module';
import { MainViewModule } from '../main-view/main-view.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsService } from '@services/settings.service';
import { loadSpotifyAuthorizeAsync } from '@factories/load-spotify-authorize.factory';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    InterceptorsModule,
    MainViewModule,
    PlayBarModule,
    SidebarModule,
    AppRoutingModule,
  ],
  declarations: [				
    AppComponent,
   ],
  providers: [
    SettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadAppSettingAsync,
      multi: true,
      deps: [SettingsService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadSpotifyAuthorizeAsync,
      multi: true,
      deps: [SettingsService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
