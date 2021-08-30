import { Injectable } from "@angular/core";
import { StorageService } from "./core/storage.service";

@Injectable({ providedIn: 'root' })
export class SessionStorageService extends StorageService {
  constructor() {
    super(window.sessionStorage);
  }
}
