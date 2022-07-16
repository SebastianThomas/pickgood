export type Optional<T> = None | Some<T>

export type None = {
  readonly type: 'none'
}

export type Some<T> = {
  value: T
  readonly type: 'some'
}
