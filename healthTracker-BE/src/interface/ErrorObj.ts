export interface ErrorObj extends Error {
  statusCode?: number;
  success?: boolean;
}
