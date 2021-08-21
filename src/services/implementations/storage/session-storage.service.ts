import { StorageService } from "../core/storage.service";

export class SessionStorageService extends StorageService {
  constructor() {
    super(window.sessionStorage);
  }
}
