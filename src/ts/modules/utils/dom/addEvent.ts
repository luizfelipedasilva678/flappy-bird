export default function addEvent<K extends keyof HTMLElementEventMap>(
  type: K,
  el: Element | null | Window,
  listener: (ev: HTMLElementEventMap[K]) => any
): void {
  if (el != null)
    el.addEventListener(type, (e) => listener(e as HTMLElementEventMap[K]));
}
