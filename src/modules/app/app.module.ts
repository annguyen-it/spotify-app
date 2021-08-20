import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AUTHENTICATION_SERVICE_INJECTOR } from '@constants/core/injection-token.constant';
import { loadAppSettingAsync } from '@factories/load-app-settings.factory';
import { InterceptorsModule } from '@interceptors/interceptors.module';
import { AppSettingsService } from '@services/implementations/core/app-settings.service';
import { AuthenticationService } from '@services/implementations/core/authentication.service';

import { TopBarModule } from '../top-bar/top-bar.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { PlayBarModule } from '../play-bar/play-bar.module';
import { MainViewModule } from '../main-view/main-view.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


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
    {
      provide: AUTHENTICATION_SERVICE_INJECTOR,
      useClass: AuthenticationService,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
