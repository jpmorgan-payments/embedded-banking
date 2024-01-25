export type FieldSpecificErrors<T> = {
  [K in keyof T]?: string;
};

export type FieldErrors<T> = FieldSpecificErrors<T> & { _global?: string };
