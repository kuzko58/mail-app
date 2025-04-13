export interface QueryClientSuccess<DataT> {
  message: string;
  data: DataT;
}

export interface QueryClientError extends QueryClientSuccess<null> {
  code: number;
}
