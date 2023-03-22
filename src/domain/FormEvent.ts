export type FormEvent<T> = Event & {
  target: { elements: { [key in keyof T]: { value: T[key]; checked: T[key] } } }
}
