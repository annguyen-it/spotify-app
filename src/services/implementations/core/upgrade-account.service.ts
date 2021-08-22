import { IUpgradeAccountService } from "@services/interfaces/core/upgrade-account-service.interface";
import { APP_SETTINGS } from "./app-settings.service";

export class UpgradeAccountService implements IUpgradeAccountService {
  upgrade(): void {
    window.location.href = APP_SETTINGS.upgradeAccountUrl;
  }
}
