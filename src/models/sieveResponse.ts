interface SieveResponse<TResponse> {
  list?: TResponse[] | null;
  totalCount?: number;
}
