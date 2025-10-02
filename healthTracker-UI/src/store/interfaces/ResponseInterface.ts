export interface ResponseObj<T> {
  success: boolean;
  data: T[];
  error: Object | boolean;
}
