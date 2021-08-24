import { BehaviorSubject, Observable } from "rxjs";

export abstract class StorageService {
  private subjects = new Map<string, BehaviorSubject<string | null>>();

  constructor(protected storage: Storage) { }

  watch(key: string): Observable<string | null> {
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<string | null>(null));
    }

    const item = this.getItem(key);
    this.subjects.get(key)!.next(item);

    return this.subjects.get(key)!.asObservable();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<string | null>(value));
    } else {
      this.subjects.get(key)!.next(value);
    }
  }

  removeItem(key: string): void {
    if (this.subjects.has(key)) {
      this.subjects.get(key)!.complete();
      this.subjects.delete(key);
    }

    this.storage.removeItem(key);
  }

  clear(): void {
    this.subjects.forEach((subject) => subject.complete());
    this.subjects.clear();
    this.storage.clear();
  }
}
