import { InjectionToken } from "@angular/core";
import { StorageService } from "@services/implementations/core/storage.service";
import { IAuthorizationService } from "@services/interfaces/core/authorization-service.interface";

export const AUTHORIZATION_SERVICE_INJECTOR = new InjectionToken<IAuthorizationService>('AUTHORIZATION_SERVICE_INJECTOR');

export const SESSION_STORAGE_SERVICE_INJECTOR = new InjectionToken<StorageService>('SESSION_STORAGE_SERVICE_INJECTOR');
export const LOCAL_STORAGE_SERVICE_INJECTOR = new InjectionToken<StorageService>('LOCAL_STORAGE_SERVICE_INJECTOR');
