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
  declarations: [TopBarComponent],
  providers: [
    {
      provide: AUTHORIZATION_SERVICE_INJECTOR,
      useClass: AuthorizationService,
    },
    {
      provide: SIGN_UP_SERVICE_INJECTOR,
      useClass: SignUpService,
    },
    {
      provide: SESSION_STORAGE_SERVICE_INJECTOR,
      useClass: SessionStorageService,
    },
  ],
  exports: [TopBarComponent]
})
export class TopBarModule { }
