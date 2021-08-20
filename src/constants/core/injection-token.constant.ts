import { InjectionToken } from "@angular/core";
import { IAuthenticationService } from "@services/interfaces/core/authentication-service.interface";

export const AUTHENTICATION_SERVICE_INJECTOR = new InjectionToken<IAuthenticationService>('AUTHENTICATION_SERVICE_INJECTOR');
