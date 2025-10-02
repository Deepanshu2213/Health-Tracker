export interface ResponseObj<T> {
  success?: boolean;
  data?: T[];
  error?: string[] | undefined;
}
