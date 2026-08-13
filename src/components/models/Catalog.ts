import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor(private events: IEvents) {}

  public setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit<{ products: IProduct[] }>("catalog:changed", {
      products: this.products,
    });
  }

  public getProducts(): IProduct[] {
    return this.products;
  }

  public getProduct(id: string): IProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  public setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.events.emit<{ product: IProduct }>("catalog:select", {
      product: this.selectedProduct,
    });
  }

  public getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
