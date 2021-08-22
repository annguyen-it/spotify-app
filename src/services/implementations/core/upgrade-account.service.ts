import { Injectable } from "@angular/core";
import { IUpgradeAccountService } from "@services/interfaces/core/upgrade-account-service.interface";
import { APP_SETTINGS } from "./app-settings.service";

@Injectable()
export class UpgradeAccountService implements IUpgradeAccountService {
  upgrade(): void {
    window.location.href = APP_SETTINGS.upgradeAccountUrl;
  }
}
