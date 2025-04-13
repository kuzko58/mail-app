export class ApiResponse<DataT> {
  public message: string;
  public data: null | DataT;
  constructor(message: string, data: null | DataT = null) {
    this.message = message;
    this.data = data;
  }
}
