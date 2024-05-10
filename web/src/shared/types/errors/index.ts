export type OriginalError = {
  message: string;
  statusCode: number;
};

export type FieldErrorsState<T> = {
  [key in keyof T]: string;
} & {
  unexpectedError?: string;
};