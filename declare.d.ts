// なぜ「export {}」があると上手くいくのか調べきれてない
export {};

declare global {
  interface HTMLElementEventMap {
    "custom-event-name": CustomEvent<string>;
  }
}
