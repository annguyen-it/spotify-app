export type DOMEvent<T = void> = T extends void
  ? _DOMEvent<HTMLElement>
  : T extends HTMLElement
    ? _DOMEvent<T>
    : Event;

interface _DOMEvent<T extends HTMLElement> extends Event {
  readonly target: T | null;
}

