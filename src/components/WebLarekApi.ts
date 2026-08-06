import type {
  IApi,
  IProductsResponse,
  IOrderResponse,
  IOrderRequest
} from "../types";

export class WebLarekApi {
  constructor(private api: IApi) {}

  getProducts(): Promise<IProductsResponse> {
    return this.api.get("/product/");
  }

  postOrder(data: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>("/order/", data);
  }
}