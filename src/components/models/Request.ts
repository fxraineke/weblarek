import type {
  IApi,
  IProductsResponse,
  IOrderResponse,
  IOrderRequest,
  IProduct,
} from "../../types";

export class Request {
  constructor(private api: IApi) {}

  getProducts(): Promise<IProductsResponse> {
    return this.api.get("/product/");
  }

  getProduct(id: string): Promise<IProduct> {
    return this.api.get("/product/" + id);
  }

  postOrder(data: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post("/order/", {
      ...data.buyer,
      total: data.total,
      items: data.items,
    });
  }
}