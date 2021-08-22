import { UserProfile } from "@models/user-profile/user-profile.model";
import { Observable } from "rxjs";

export interface IUserProfileService {
  getProfile(userId?: string): Observable<UserProfile>;
}