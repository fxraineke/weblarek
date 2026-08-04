export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface IProductsResponse {
  items: IProduct[];
  total: number;
}

export interface IOrderResponse {
  id: string;
  total: number;
}

export interface IOrderRequest {
  buyer: IBuyer;
  total: number;
  items: string[];
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface ICatalogState {
  products: IProduct[];
  selectedProduct: IProduct | null;
}

export interface ICart {
  products: IProduct[];
}

export type TPayment = "card" | "cash" | "";

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}
