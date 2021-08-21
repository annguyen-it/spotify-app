import { StorageService } from "../core/storage.service";

export class LocalStorageService extends StorageService {
  constructor() {
    super(window.localStorage);
  }
}
