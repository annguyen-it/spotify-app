import { Cursor } from "./cursor.model";

export interface CursorPaging<T> {
  cursor: Cursor;
  href: string;
  items: T[];
  limit: number;
  next: string;
  total: number;
}
