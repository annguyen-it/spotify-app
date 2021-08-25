import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { loadAppSettingAsync } from '@factories/load-app-settings.factory';
import { InterceptorsModule } from '@interceptors/interceptors.module';

import { TopBarModule } from '../top-bar/top-bar.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { PlayBarModule } from '../play-bar/play-bar.module';
import { MainViewModule } from '../main-view/main-view.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppSettingsService } from '@services/app-settings.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    InterceptorsModule,
    MainViewModule,
    PlayBarModule,
    SidebarModule,
    TopBarModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AppSettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadAppSettingAsync,
      multi: true,
      deps: [AppSettingsService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
