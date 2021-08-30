import { CursorPaging } from "@models/cursor/cursor-paging.model";
import { PlayHistory } from "@models/play/play-history.model";

export interface GetCurrentUserRecentlyPlayedTracksResponse extends CursorPaging<PlayHistory> { }
